"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { getRepositories } from "@/lib/actions/repositories"
import { Installation, Repository } from "@/lib/actions/types"
import { InstallationLink } from "./installation-link"
import { useState, useEffect, useMemo, useTransition } from "react"
import { createProject } from "@/lib/actions/projects"
import InstallationDropdown from "./installation-dropdown"
import { toast } from "sonner"
import { redirect } from "next/navigation"

export default function NewProjectForm({ installations }: { installations: Installation[] }) {
    const [selectedInstallation, setSelectedInstallation] = useState<Installation | undefined>(undefined)
    const [repositories, setRepositories] = useState<Repository[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [isPending, startTransition] = useTransition()
    const [importingRepo, setImportingRepo] = useState<string | null>(null)

    useEffect(() => {
        if (installations && installations.length > 0) {
            const initialInstallation = installations[0]
            setSelectedInstallation(initialInstallation)
            fetchRepositories(initialInstallation.id)
        }
    }, [installations])

    useEffect(() => {
        if (selectedInstallation) {
            fetchRepositories(selectedInstallation.id)
        }
    }, [selectedInstallation])

    const fetchRepositories = async (installationId: string) => {
        try {
            const result = await getRepositories({ installation_id: installationId })
            if (result.success && result.repositories) {
                setRepositories(result.repositories)
            } else {
                setRepositories([])
                if (result.error) {
                    toast.error(result.error.message || 'Failed to fetch repositories')
                }
            }
        } catch (error) {
            setRepositories([])
            toast.error('Failed to fetch repositories')
        }
    }

    const handleInstallationChange = (installation: Installation) => {
        setSelectedInstallation(installation)
    }

    const handleImport = async (repo: Repository) => {
        if (selectedInstallation) {
            setImportingRepo(repo.id)
            startTransition(async () => {
                const result = await createProject({
                    installation_id: parseInt(selectedInstallation.id),
                    name: repo.name,
                    repository_id: parseInt(repo.id),
                    repository_owner: selectedInstallation.target
                })

                if (result.success && result.project) {
                    toast.success(`Project ${result.project.attributes.name} successfully created`)
                    redirect(`/project/${result.project.id}`)
                } else {
                    toast.error(result.error?.message || 'Failed to create project')
                }
                setImportingRepo(null)
            })
        }
    }

    const filteredRepositories = useMemo(() => {
        if (!searchQuery.trim()) return repositories
        return repositories.filter(repo =>
            repo.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [repositories, searchQuery])

    const getMessage = () => {
        if (!installations || installations.length === 0) {
            return "Install the GitHub App to add repositories"
        }
        if (!selectedInstallation) {
            return "Select an installation to view repositories"
        }
        if (repositories.length === 0) {
            return "No repositories found"
        }
        if (searchQuery && filteredRepositories.length === 0) {
            return `No repositories found matching "${searchQuery}"`
        }
        return null
    }

    const message = getMessage()

    return (
        <main>
            <div className="space-y-4">
                {/* Installation Selection */}
                <div className="flex flex-col gap-4">
                    <div className="md:hidden">
                        <InstallationDropdown
                            installations={installations}
                            selectedInstallation={selectedInstallation}
                            onInstallationChange={handleInstallationChange}
                        />
                    </div>

                    <div className="hidden md:flex gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search repositories..."
                                    className="pl-9 w-full h-10"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex-shrink-0">
                            <InstallationDropdown
                                installations={installations}
                                selectedInstallation={selectedInstallation}
                                onInstallationChange={handleInstallationChange}
                            />
                        </div>
                    </div>

                    <div className="md:hidden">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search repositories..."
                                className="pl-9 w-full h-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Repository List */}
                <div className="border rounded-lg p-3 bg-background">
                    {message ? (
                        <div className="flex items-center justify-center p-6 text-muted-foreground">
                            <span className="text-sm">{message}</span>
                        </div>
                    ) : (
                        <div className="space-y-2 max-h-[calc(6*3.5rem+5*0.5rem)] overflow-y-auto">
                            {filteredRepositories.map((repo) => (
                                <div key={repo.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors h-[3.5rem]">
                                    <span className="text-sm font-medium truncate">{repo.name}</span>
                                    <Button
                                        size="sm"
                                        variant="default"
                                        className="h-8 px-4 text-sm"
                                        onClick={() => handleImport(repo)}
                                        disabled={isPending}
                                    >
                                        {importingRepo === repo.id ? "Importing..." : "Import"}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="text-center pt-2 pb-8">
                    <p className="text-sm text-muted-foreground">
                        Missing Git repository? Adjust{" "}
                        <InstallationLink
                            installations={installations}
                            className="underline underline-offset-4 hover:text-foreground transition-colors"
                        />
                        .
                    </p>
                </div>
            </div>
        </main>
    );
}
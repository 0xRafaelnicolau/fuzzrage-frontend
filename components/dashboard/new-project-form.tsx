"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { getRepositories, Installation, Repository } from "@/lib/data"
import { InstallAppLink } from "./install-app-link"
import InstallationDropdown from "./installation-dropdown"
import { useState, useEffect, useMemo } from "react"
import { createProject } from "@/lib/actions"

export default function NewProjectForm({ installations }: { installations: Installation[] | null }) {
    const [selectedInstallation, setSelectedInstallation] = useState<Installation | null>(null)
    const [repositories, setRepositories] = useState<Repository[]>([])
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        const fetchRepositories = async () => {
            if (installations && installations.length > 0) {
                setSelectedInstallation(installations[0])

                try {
                    const repos = await getRepositories(installations[0].id)
                    setRepositories(repos || [])
                } catch (error) {
                    console.error('Failed to fetch repositories:', error)
                    setRepositories([])
                }
            } else {
                setRepositories([])
            }
        }

        fetchRepositories()
    }, [installations])

    useEffect(() => {
        const fetchRepositories = async () => {
            if (!selectedInstallation) {
                setRepositories([])
                return
            }

            try {
                const repos = await getRepositories(selectedInstallation.id)
                setRepositories(repos || [])
            } catch (error) {
                console.error('Failed to fetch repositories:', error)
                setRepositories([])
            }
        }

        fetchRepositories()
    }, [selectedInstallation])

    const handleInstallationChange = (installation: Installation) => {
        setSelectedInstallation(installation)
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    // Filter repositories based on search query
    const filteredRepositories = useMemo(() => {
        if (!searchQuery.trim()) {
            return repositories
        }

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
                <div className="flex flex-col gap-4">
                    <div className="space-y-2 md:hidden">
                        <InstallationDropdown
                            installations={installations}
                            variant="mobile"
                            selectedInstallation={selectedInstallation}
                            onInstallationChange={handleInstallationChange}
                        />
                    </div>

                    <div className="hidden md:flex md:flex-row gap-4 w-full">
                        <div className="space-y-2 flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="repository"
                                    placeholder="Search repositories..."
                                    className="pl-9 w-full h-10"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2 flex-shrink-0">
                            <InstallationDropdown
                                installations={installations}
                                variant="desktop"
                                selectedInstallation={selectedInstallation}
                                onInstallationChange={handleInstallationChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-2 md:hidden">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="repository"
                                placeholder="Search repositories..."
                                className="pl-9 w-full h-10"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="border rounded-lg p-3 bg-background">
                        {message ? (
                            <div className="flex items-center justify-center p-6 text-muted-foreground">
                                <span className="text-sm">{message}</span>
                            </div>
                        ) : (
                            <div className="space-y-2 max-h-[calc(6*3.5rem+5*0.5rem)] overflow-y-auto">
                                {filteredRepositories.map((repo) => (
                                    <div key={repo.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors h-[3.5rem]">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium truncate">{repo.name}</span>
                                        </div>
                                        <Button size="sm" variant="default" className="h-8 px-4 text-sm" onClick={() => {
                                            if (selectedInstallation) {
                                                createProject(selectedInstallation.id, repo.name, repo.id)
                                            }
                                        }}>
                                            Import
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="text-center pt-2 pb-8">
                    <p className="text-sm text-muted-foreground">
                        Missing Git repository? Adjust{" "}
                        <InstallAppLink
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
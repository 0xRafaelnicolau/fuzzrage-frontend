"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Installation, createInstallation } from "@/lib/actions/installations";
import { Repository, getRepositories } from "@/lib/actions/repositories";
import { createProject } from "@/lib/actions/projects";
import { User } from "@/lib/actions/user";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GitHubIcon } from "@/components/ui/github-icon";
import { GitLabIcon } from "@/components/ui//gitlab-icon";
import { BitbucketIcon } from "@/components/ui/bitbucket-icon";
import { ChevronDown, Search } from "lucide-react";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export const getProviderIcon = (provider?: string) => {
    switch (provider?.toLowerCase()) {
        case 'github':
            return <GitHubIcon />;
        case 'gitlab':
            return <GitLabIcon />;
        case 'bitbucket':
            return <BitbucketIcon />;
        default:
            return <GitHubIcon />;
    }
};

export const getProviderName = (provider?: string) => {
    switch (provider?.toLowerCase()) {
        case 'github':
            return 'GitHub';
        case 'gitlab':
            return 'GitLab';
        case 'bitbucket':
            return 'Bitbucket';
        default:
            return 'GitHub';
    }
};

export function ImportRepo({ user, installations }: { user: User, installations: Installation[] }) {
    // Filters
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 300);

    // Installations
    const [installation, setInstallation] = useState<Installation | null>(installations[0] || null);
    const handleInstallation = async () => {
        const response = await createInstallation()
        if (response.success && response.url) {
            window.open(response.url, 'Install App', 'width=800,height=700,scrollbars=yes,resizable=yes');
        } else {
            toast.error(response.error?.message)
        }
    }

    // Repositories
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [loadingRepos, setLoadingRepos] = useState(false)
    const handleRepositories = async () => {
        if (!installation) return

        setLoadingRepos(true)

        const response = await getRepositories({ installation_id: installation.id })
        if (response.success && response.repositories) {
            setRepositories(response.repositories)
        } else {
            setRepositories([])
            if (response.error) {
                toast.error(response.error.message || 'Failed to fetch repositories')
            }
        }

        setLoadingRepos(false)
    }

    useEffect(() => {
        handleRepositories()
    }, [installation])

    // Projects
    const [importing, setImporting] = useState<string | null>(null)
    const handleImport = async (repo: Repository) => {
        if (!installation) return

        setImporting(repo.id)
        const response = await createProject({
            installation_id: parseInt(installation.id),
            name: repo.name,
            repository_id: parseInt(repo.id),
            repository_owner: installation.target
        })

        if (response.success && response.project) {
            setImporting(null)
            toast.success('Project imported successfully')
            redirect(`/project/${response.project.id}`)
        } else {
            setImporting(null)
            toast.error(response.error?.message || 'Failed to import project')
        }
    }

    // Filter repositories based on search
    const filteredRepositories = repositories.filter(repo =>
        repo.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 flex-col sm:flex-row mb-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search repositories..."
                        className="pl-10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex-shrink-0 w-full sm:w-auto">
                    {installations.length === 0 ? (
                        <Button variant="outline" className="w-full sm:w-auto" onClick={handleInstallation}>
                            <div className="flex items-center gap-2">
                                {getProviderIcon(user?.provider)}
                                Install {getProviderName(user?.provider)} App
                            </div>
                        </Button>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full sm:w-48">
                                    <div className="flex items-center gap-2">
                                        {getProviderIcon(installation?.provider)}
                                        {installation?.target}
                                        <ChevronDown className="h-4 w-4" />
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                                {installations.map((installation) => (
                                    <DropdownMenuItem
                                        key={installation.id}
                                        onClick={() => setInstallation(installation)}
                                    >
                                        <div className="flex items-center gap-2">
                                            {getProviderIcon(installation.provider)}
                                            {installation.target}
                                        </div>
                                    </DropdownMenuItem>
                                ))}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem key="installation" onClick={handleInstallation}>
                                    {getProviderIcon(user?.provider)}
                                    Update Permissions
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>

            {loadingRepos ? (
                <div className="flex-1 min-h-0">
                    <div className="flex justify-center items-center py-16">
                        <Spinner variant="default" className="text-muted-foreground" />
                    </div>
                </div>
            ) : repositories.length > 0 && (
                <div className="flex-1 min-h-0">
                    <ScrollArea className="h-[calc(100vh-21rem)]">
                        <div className="space-y-2">
                            {filteredRepositories.map((repo) => (
                                <div
                                    key={repo.id}
                                    className="flex items-center justify-between p-3 rounded-lg border bg-background border-border transition-colors h-[3.5rem]"
                                >
                                    <span className="text-sm font-medium truncate">{repo.name}</span>
                                    <Button
                                        size="sm"
                                        variant="default"
                                        className="h-8 px-4 text-sm"
                                        onClick={() => handleImport(repo)}
                                        disabled={importing === repo.id}
                                    >
                                        {importing === repo.id ? "Importing..." : "Import"}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            )}
        </div>
    )
}
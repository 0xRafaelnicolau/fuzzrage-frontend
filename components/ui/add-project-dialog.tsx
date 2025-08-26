import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Search } from "lucide-react"
import { GitHubIcon } from "@/components/ui/icons/github-icon"
import { GitLabIcon } from "@/components/ui/icons/gitlab-icons"
import { BitbucketIcon } from "@/components/ui/icons/bitbucket-icon"
import { User, getUserInstallations } from "@/lib/data"

const getProviderIcon = (provider?: string) => {
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

const getProviderName = (provider?: string) => {
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

export async function AddProjectDialog({ user }: { user?: User | null }) {
    const installations = await getUserInstallations()

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add Project</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[420px]">
                <DialogHeader>
                    <DialogTitle>Import Git Repository</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <DropdownMenu>
                            {installations && installations.length > 0 ? (
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="justify-between">
                                        <div className="flex items-center">
                                            {getProviderIcon(installations?.[0]?.provider)}
                                            {installations?.[0]?.target || "Select installation"}
                                        </div>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                            ) : (
                                <Button variant="outline" className="justify-between pl-3">
                                    <div className="flex items-center">
                                        {getProviderIcon(installations?.[0]?.provider)}
                                        Install {getProviderName(installations?.[0]?.provider)} App
                                    </div>
                                </Button>
                            )}

                            <DropdownMenuContent className="w-full">
                                {installations?.map((installation) => (
                                    <DropdownMenuItem key={installation.id}>
                                        <div className="flex items-center">
                                            {getProviderIcon(installation.provider)}
                                            {installation.target}
                                        </div>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="grid gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="repository"
                                placeholder="Search repositories..."
                                className="pl-9"
                            />
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <p className="text-sm text-muted-foreground">
                        Missing Git repository? Adjust {getProviderName(user?.provider)} app permissions.
                    </p>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

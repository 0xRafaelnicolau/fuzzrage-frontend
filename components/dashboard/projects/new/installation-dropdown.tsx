"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { createInstallation } from "@/lib/actions/installations"
import { Installation } from "@/lib/actions/types"
import { getProviderIcon } from "@/components/providers/icon-provider"
import { toast } from "sonner"

interface InstallationDropdownProps {
    installations: Installation[]
    selectedInstallation?: Installation
    onInstallationChange: (installation: Installation) => void
    className?: string
}

export default function InstallationDropdown({
    installations,
    selectedInstallation,
    onInstallationChange,
    className = ""
}: InstallationDropdownProps) {
    const handleInstallation = async () => {
        const response = await createInstallation()
        if (response.success && response.url) {
            window.open(response.url, 'Install App', 'width=800,height=700,scrollbars=yes,resizable=yes');
        } else {
            toast.error(response.error?.message)
        }
    }

    if (!installations || installations.length === 0) {
        return (
            <Button
                variant="outline"
                size="lg"
                className={`justify-between w-full ${className}`}
                onClick={handleInstallation}
            >
                <div className="flex items-center gap-2">
                    {getProviderIcon("github")}
                    Install GitHub App
                </div>
            </Button>
        )
    }

    const currentInstallation = selectedInstallation || installations[0]
    const displayText = currentInstallation?.target || "Select App"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="lg" className={`justify-between w-full ${className}`}>
                    <div className="flex items-center gap-2">
                        {getProviderIcon(currentInstallation?.provider || "github")}
                        {displayText}
                    </div>
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                {installations.map((installation) => (
                    <DropdownMenuItem
                        key={installation.id}
                        onClick={() => onInstallationChange(installation)}
                    >
                        <div className="flex items-center gap-2">
                            {getProviderIcon(installation.provider)}
                            {installation.target}
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
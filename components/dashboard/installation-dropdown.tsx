"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { installApp } from "@/lib/actions"
import { getProviderIcon } from "../providers/icon-provider"
import { getProviderName } from "../providers/name-provider"

interface Installation {
    id: string
    provider: string
    target: string
}

interface InstallationDropdownProps {
    installations: Installation[] | null
    className?: string
    variant?: "mobile" | "desktop"
    provider?: "github" | "gitlab" | "bitbucket"
    selectedInstallation?: Installation | null
    onInstallationChange?: (installation: Installation) => void
}

export default function InstallationDropdown({
    installations,
    className = "",
    variant = "desktop",
    provider,
    selectedInstallation,
    onInstallationChange
}: InstallationDropdownProps) {
    const handleInstallApp = async () => {
        const url = await installApp();
        if (url) {
            window.open(url, 'Install App', 'width=800,height=700,scrollbars=yes,resizable=yes');
        }
    }

    const handleInstallationSelect = (installation: Installation) => {
        if (onInstallationChange) {
            onInstallationChange(installation)
        }
    }

    const isMobile = variant === "mobile"
    const buttonClassName = isMobile
        ? "justify-between w-full"
        : "justify-between w-auto min-w-fit"

    // If no installations, show install button
    if (!installations || installations.length === 0) {
        return (
            <Button
                variant="outline"
                size="lg"
                className={`${buttonClassName} ${className}`}
                onClick={handleInstallApp}
            >
                <div className="flex items-center">
                    {getProviderIcon("github")}
                    Install GitHub App
                </div>
            </Button>
        )
    }

    if (!selectedInstallation) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="lg" className={`${buttonClassName} ${className}`}>
                        <div className="flex items-center">
                            {getProviderIcon(provider)}
                            Select {getProviderName(provider)} App
                        </div>
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                    {installations.map((installation) => (
                        <DropdownMenuItem
                            key={installation.id}
                            onClick={() => handleInstallationSelect(installation)}
                        >
                            <div className="flex items-center">
                                {getProviderIcon(installation.provider)}
                                {installation.target}
                            </div>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="lg" className={`${buttonClassName} ${className}`}>
                    <div className="flex items-center gap-2">
                        {getProviderIcon(selectedInstallation.provider)}
                        {selectedInstallation.target}
                    </div>
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                {installations.map((installation) => (
                    <DropdownMenuItem
                        key={installation.id}
                        onClick={() => handleInstallationSelect(installation)}
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
'use client'

import { installApp } from "@/lib/actions"
import { getProviderName } from "../providers/name-provider"
import { Installation } from "@/lib/data"

export function InstallationLink({
    installations,
    className = ""
}: {
    installations: Installation[] | null
    className?: string
}) {
    const handleInstallation = async () => {
        const url = await installApp();
        if (url) {
            window.open(url, 'Install App', 'width=800,height=700,scrollbars=yes,resizable=yes');
        }
    }

    return (
        <button
            onClick={handleInstallation}
            className={className}
        >
            {getProviderName(installations?.[0]?.provider)} Permissions
        </button>
    )
}

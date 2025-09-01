"use client"

import { createInstallation } from "@/lib/actions/installations"
import { getProviderName } from "../providers/name-provider"
import { Installation } from "@/lib/actions/types"
import { toast } from "sonner"

export function InstallationLink({
    installations,
    className = ""
}: {
    installations: Installation[]
    className?: string
}) {
    const handleInstallation = async () => {
        const response = await createInstallation()
        if (response.success && response.url) {
            window.open(response.url, 'Install App', 'width=800,height=700,scrollbars=yes,resizable=yes');
        } else {
            toast.error(response.error?.message)
            console.error(response.error)
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
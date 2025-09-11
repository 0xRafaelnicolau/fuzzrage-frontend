"use client"

import { Installation, createInstallation } from "@/lib/actions/installations"
import { toast } from "sonner"

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
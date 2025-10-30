"use client";

import { usePathname } from "next/navigation";
import FlickeringGrid from "@/components/ui/flickering-grid";

interface ConditionalFlickeringGridProps {
    projectId: string;
    campaignId: string;
}

export default function ConditionalFlickeringGrid({ projectId, campaignId }: ConditionalFlickeringGridProps) {
    const pathname = usePathname();

    // Check if we're on the coverage page
    const isCoveragePage = pathname.includes(`/project/${projectId}/campaign/${campaignId}/coverage`);

    // Don't render the flickering grid on the coverage page
    if (isCoveragePage) {
        return null;
    }

    return (
        <FlickeringGrid
            className="fixed inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center_60%,white,transparent)]"
            color="#0B54C7"
            maxOpacity={0.5}
            flickerChance={0.5}
            squareSize={4}
            gridGap={4}
        />
    );
}

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Campaign } from "@/lib/actions/campaigns";
import { Settings } from "lucide-react";
import CodeEditor from "@uiw/react-textarea-code-editor";

interface CampaignConfigCardProps {
    campaign: Campaign;
}

export function CampaignConfigCard({ campaign }: CampaignConfigCardProps) {

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="py-0">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4 text-muted-foreground" />
                        <h3 className="font-medium text-base">Config</h3>
                    </div>
                </div>
            </CardHeader>

            <div className="border-t border-border -mt-6" />

            <CardContent className="space-y-3">
                <CodeEditor
                    value={campaign.attributes.settings.execution.config}
                    language="yaml"
                    readOnly
                    padding={13}
                    className="rounded-md border border-input shadow-xs"
                    style={{
                        backgroundColor: "var(--background)",
                        fontFamily: "var(--font-mono)",
                    }}
                />
            </CardContent>
        </Card>
    );
}
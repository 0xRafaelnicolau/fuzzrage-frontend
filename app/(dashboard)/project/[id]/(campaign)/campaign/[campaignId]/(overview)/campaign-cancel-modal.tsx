"use client"

import { AlertTriangle, XCircle } from "lucide-react"
import { cancelCampaign, CancelCampaignRequest } from "@/lib/actions/campaigns"
import { toast } from "sonner"
import { useState } from "react"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface CampaignCancelModalProps {
    campaignId: string;
    projectId: string;
    onCampaignCancelled?: (bool: boolean) => void;
}

export function CampaignCancelModal({ campaignId, projectId, onCampaignCancelled }: CampaignCancelModalProps) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleCampaignCancel = async () => {
        setLoading(true);

        const request: CancelCampaignRequest = {
            project_id: projectId,
            campaign_id: campaignId
        }

        const campaign = await cancelCampaign(request);
        if (campaign.success) {
            toast.success("Campaign cancelled successfully");

            if (onCampaignCancelled) {
                onCampaignCancelled(true);
            }
        } else {
            toast.error(campaign.error?.message || "Failed to cancel campaign");
        }

        setLoading(false);
    }

    return (
        <>
            <Button
                type="button"
                onClick={() => setOpen(true)}
            >
                <XCircle className="h-4 w-4" />
                <span className="hidden sm:inline">
                    Cancel Campaign
                </span>
            </Button>

            <AlertDialog open={open} onOpenChange={(open) => {
                setOpen(open);
            }}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This will stop the campaign execution and it will be marked as cancelled. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            disabled={loading}
                            onClick={handleCampaignCancel}
                        >
                            {loading ? "Cancelling..." : "Cancel Campaign"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
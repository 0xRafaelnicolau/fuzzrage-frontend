export type CampaignStateOption = {
    value: string;
    label: string;
    color: string;
};

export const CAMPAIGN_STATE_OPTIONS: CampaignStateOption[] = [
    { value: "SUCCEEDED", label: "Succeeded", color: "bg-green-500" },
    { value: "FAILED", label: "Failed", color: "bg-red-500" },
    { value: "RUNNING", label: "Running", color: "bg-orange-500" },
    { value: "QUEUED", label: "Queued", color: "bg-yellow-500" },
    { value: "CANCELLED", label: "Canceled", color: "bg-gray-400" },
];

export function getCampaignStateOption(state: string): CampaignStateOption | undefined {
    return CAMPAIGN_STATE_OPTIONS.find(opt => opt.value === state);
}


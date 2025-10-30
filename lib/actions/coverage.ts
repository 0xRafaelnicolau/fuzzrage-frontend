'use server'

import { request } from "@/lib/helpers";
import { Error } from "@/lib/types";

export type Coverage = {
    content: string;
    percentage: number;
    id: string;
    type: string;
}

export type GetCoverageRequest = {
    project_id: string;
    campaign_id: string;
    filename: string;
}

export type GetCoverageResponse = {
    data: {
        attributes: {
            content: string;
            percentage: number;
        };
        id: string;
        type: string;
    };
}

export async function getCoverage(req: GetCoverageRequest): Promise<{ success: boolean; coverage?: Coverage; error?: Error }> {
    const queryParams = new URLSearchParams();

    if (req.filename) {
        queryParams.append('filename', req.filename);
    }

    const result = await request(`/v1/projects/${req.project_id}/campaigns/${req.campaign_id}/cov${queryParams.toString() ? `?${queryParams.toString()}` : ''}`, {
        method: 'GET',
    });

    if (result.success && result.response) {
        try {
            const data: GetCoverageResponse = await result.response.json();

            const coverage: Coverage = {
                content: data.data.attributes.content,
                percentage: data.data.attributes.percentage,
                id: data.data.id,
                type: data.data.type,
            };

            return { success: true, coverage };
        } catch (error) {
            return { success: false, error: { message: 'Failed to parse coverage response' } };
        }
    }

    return { success: false, error: result.error };
}
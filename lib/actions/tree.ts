'use server'

import { request } from "@/lib/helpers";
import { Error } from "@/lib/types";

export type TreeObject = {
    path: string;
    size: number;
    type: string;
}

export type GetTreeRequest = {
    project_id: string;
    campaign_id: string;
}

export type GetTreeResponse = {
    data: Array<{
        attributes: {
            path: string;
            size: number;
            type: string;
        },
        id: string;
        type: string;
    }>
}

export async function getTree(req: GetTreeRequest): Promise<{ success: boolean; treeObjects?: TreeObject[]; error?: Error }> {
    const result = await request(`/v1/projects/${req.project_id}/campaigns/${req.campaign_id}/tree`);

    if (result.success && result.response) {
        try {
            const data: GetTreeResponse = await result.response.json();

            const treeObjects: TreeObject[] = data.data.map((item) => ({
                path: item.attributes.path,
                size: item.attributes.size,
                type: item.attributes.type,
            }));

            return { success: true, treeObjects };
        } catch (error) {
            return { success: false, error: { message: 'Failed to parse tree response' } };
        }
    }

    return { success: false, error: result.error };
}
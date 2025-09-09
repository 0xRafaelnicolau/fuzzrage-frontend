'use server'

import { request } from "./helpers";
import { Error } from "./types";

export type Activity = {
    action: string
    timestamp: string
    project_id: string
    project_name: string
    user_id: string
    user_name: string
    user_avatar: string
}

export type GetProjectActivityRequest = {
    project_id: string;
    page?: number;
    size?: number;
    sort?: string;
    name_like?: string;
    created_at_gte?: string;
    created_at_lte?: string;
}

export type GetProjectActivityResponse = {
    data: Array<{
        attributes: {
            action: string,
            avatar_url: string,
            created_at: string,
            project_id: number,
            project_name: string,
            target_id: number,
            target_type: string,
            updated_at: string,
            user_id: number,
            username: string
        },
        id: string,
        type: string
    }>
}

export async function getProjectActivity(req: GetProjectActivityRequest): Promise<{ success: boolean; activity?: Activity[]; error?: Error }> {
    const queryParams = new URLSearchParams();

    if (req?.page !== undefined) {
        queryParams.append('page', req.page.toString());
    }
    if (req?.size !== undefined) {
        queryParams.append('size', req.size.toString());
    }
    if (req?.sort) {
        queryParams.append('sort', req.sort);
    }
    if (req?.name_like) {
        queryParams.append('name_like', req.name_like);
    }
    if (req?.created_at_gte) {
        queryParams.append('created_at_gte', req.created_at_gte);
    }
    if (req?.created_at_lte) {
        queryParams.append('created_at_lte', req.created_at_lte);
    }

    const result = await request(`/v1/projects/${req.project_id}/activity${queryParams.toString() ? `?${queryParams.toString()}` : ''}`, {
        method: 'GET',
    })

    if (result.success && result.response) {
        try {
            const data: GetProjectActivityResponse = await result.response.json()

            const activity: Activity[] = data.data.map(item => ({
                action: item.attributes.action,
                timestamp: item.attributes.created_at,
                project_id: item.attributes.project_id.toString(),
                project_name: item.attributes.project_name,
                user_id: item.attributes.user_id.toString(),
                user_name: item.attributes.username,
                user_avatar: item.attributes.avatar_url,
            }))

            return { success: true, activity }
        } catch {
            return { success: false, error: { message: 'Failed to parse get project activity data' } }
        }
    }

    return { success: false, error: result.error }
}

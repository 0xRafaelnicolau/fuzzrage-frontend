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
    target_type?: string;
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

export type ActivityPaginationResult = {
    activity: Activity[];
    hasMore: boolean;
    currentPage: number;
    pageSize: number;
}

export async function getProjectActivity(req: GetProjectActivityRequest): Promise<{ success: boolean; result?: ActivityPaginationResult; error?: Error }> {
    const pageSize = req.size || 20;
    const currentPage = req.page || 1;
    const fetchSize = pageSize + 1;

    const queryParams = new URLSearchParams();
    queryParams.append('page', currentPage.toString());
    queryParams.append('size', fetchSize.toString());

    if (req?.sort) {
        queryParams.append('sort', req.sort);
    }
    if (req?.target_type) {
        queryParams.append('target_type', req.target_type);
    }
    if (req?.created_at_gte) {
        queryParams.append('created_at_gte', req.created_at_gte);
    }
    if (req?.created_at_lte) {
        queryParams.append('created_at_lte', req.created_at_lte);
    }

    const result = await request(`/v1/projects/${req.project_id}/activity?${queryParams.toString()}`, {
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

            const hasMore = activity.length > pageSize;
            const displayActivity = hasMore ? activity.slice(0, pageSize) : activity;

            return {
                success: true,
                result: {
                    activity: displayActivity,
                    hasMore,
                    currentPage,
                    pageSize
                }
            }
        } catch {
            return { success: false, error: { message: 'Failed to parse get project activity data' } }
        }
    }

    return { success: false, error: result.error }
}

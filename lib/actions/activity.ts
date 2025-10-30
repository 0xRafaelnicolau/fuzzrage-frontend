'use server'

import { request } from "@/lib/helpers";
import { Error } from "@/lib/types";

export type Activity = {
    action: string
    target_id: string
    target_type: string
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
    target_type_in?: string;
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
            target_id: string,
            target_type: string,
            updated_at: string,
            user_id: number | null,
            username: string
        },
        id: string,
        type: string
    }>
    meta: {
        current_page: number,
        per_page: number,
        total: number,
        total_pages: number
    }
}

export async function getProjectActivity(req: GetProjectActivityRequest): Promise<{ success: boolean; activity?: Activity[]; meta?: GetProjectActivityResponse['meta']; error?: Error }> {
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
    if (req?.target_type) {
        queryParams.append('target_type', req.target_type);
    }
    if (req?.target_type_in) {
        queryParams.append('target_type_in', req.target_type_in);
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
                target_id: item.attributes.target_id.toString(),
                target_type: item.attributes.target_type,
                timestamp: item.attributes.created_at,
                project_id: item.attributes.project_id.toString(),
                project_name: item.attributes.project_name,
                user_id: item.attributes.user_id?.toString() || '',
                user_name: item.attributes.username || '',
                user_avatar: item.attributes.avatar_url || '',
            }))

            return { success: true, activity, meta: data.meta }
        } catch (e) {
            console.error('Parse error:', e)
            return { success: false, error: { message: 'Failed to parse get project activity data' } }
        }
    }

    return { success: false, error: result.error }
}

export type GetActivityRequest = {
    page?: number;
    size?: number;
    sort?: string;
    target_type?: string;
    target_type_in?: string;
    created_at_gte?: string;
    created_at_lte?: string;
}

export type GetActivityResponse = {
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
            user_id: number | null,
            username: string
        },
        id: string,
        type: string
    }>
    meta: {
        current_page: number,
        per_page: number,
        total: number,
        total_pages: number
    }
}

export async function getActivity(req: GetActivityRequest): Promise<{ success: boolean; activity?: Activity[]; meta?: GetActivityResponse['meta']; error?: Error }> {
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
    if (req?.target_type) {
        queryParams.append('target_type', req.target_type);
    }
    if (req?.target_type_in) {
        queryParams.append('target_type_in', req.target_type_in);
    }
    if (req?.created_at_gte) {
        queryParams.append('created_at_gte', req.created_at_gte);
    }
    if (req?.created_at_lte) {
        queryParams.append('created_at_lte', req.created_at_lte);
    }

    const result = await request(`/v1/projects/activity${queryParams.toString() ? `?${queryParams.toString()}` : ''}`, {
        method: 'GET',
    })

    if (result.success && result.response) {
        try {
            const data: GetActivityResponse = await result.response.json()

            const activity: Activity[] = data.data.map(item => ({
                action: item.attributes.action,
                target_id: item.attributes.target_id.toString(),
                target_type: item.attributes.target_type,
                timestamp: item.attributes.created_at,
                project_id: item.attributes.project_id.toString(),
                project_name: item.attributes.project_name,
                user_id: item.attributes.user_id?.toString() || '',
                user_name: item.attributes.username || '',
                user_avatar: item.attributes.avatar_url || '',
            }))

            return { success: true, activity, meta: data.meta }
        } catch {
            return { success: false, error: { message: 'Failed to parse get activity data' } }
        }
    }

    return { success: false, error: result.error }
}
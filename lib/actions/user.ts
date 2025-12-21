'use server'

import { request } from "@/lib/helpers";
import { Error } from "@/lib/types";

export type User = {
    avatar_url: string;
    created_at: string;
    email: string;
    name: string;
    notifications: boolean;
    plan_id: number;
    plan_name: string;
    provider: string;
    updated_at: string;
}

export type GetUserResponse = {
    data: {
        id: string
        type: string
        attributes: User
    }
}

export async function getUser(): Promise<{ success: boolean; user?: User; error?: Error }> {
    const result = await request(`/v1/user`, {
        method: 'GET'
    })

    if (result.success && result.response) {
        try {
            const data: GetUserResponse = await result.response.json()

            const user = {
                avatar_url: data.data.attributes.avatar_url,
                created_at: data.data.attributes.created_at,
                email: data.data.attributes.email,
                name: data.data.attributes.name,
                notifications: data.data.attributes.notifications,
                plan_id: data.data.attributes.plan_id,
                plan_name: data.data.attributes.plan_name,
                provider: data.data.attributes.provider,
                updated_at: data.data.attributes.updated_at
            }

            return { success: true, user }
        } catch {
            return {
                success: false, error: { message: 'Failed to parse user data' }
            }
        }
    }

    return { success: false, error: result.error }
}

export async function deleteUser(): Promise<{ success: boolean; error?: Error }> {
    const result = await request(`/v1/user`, {
        method: 'DELETE'
    })

    if (result.success && result.response) {
        return { success: true }
    }

    return { success: false, error: result.error }
}

export type Usage = {
    active_campaigns: number;
    projects_count: number;
    storage_used: number;
    user_id: number;
}

export type GetUserUsageResponse = {
    data: {
        id: string;
        type: string;
        attributes: {
            active_campaigns: number;
            projects_count: number;
            storage_used: number;
            user_id: number;
        };
    };
}

export async function getUsage(): Promise<{ success: boolean; usage?: Usage; error?: Error }> {
    const result = await request(`/v1/user/usage`, {
        method: 'GET'
    })

    if (result.success && result.response) {
        try {
            const response: GetUserUsageResponse = await result.response.json()
            const data = response.data;

            const usage = {
                active_campaigns: data.attributes.active_campaigns,
                projects_count: data.attributes.projects_count,
                storage_used: data.attributes.storage_used,
                user_id: data.attributes.user_id
            }

            return { success: true, usage: usage }
        } catch {
            return {
                success: false, error: { message: 'Failed to parse user usage data' }
            }
        }
    }

    return { success: false, error: result.error }
}
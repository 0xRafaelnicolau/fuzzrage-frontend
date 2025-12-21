'use server'

import { request } from "@/lib/helpers";
import { Error } from "@/lib/types";


export type Plan = {
    created_at: string;
    max_active_campaigns: number;
    max_collabs_per_project: number;
    max_configs_per_project: number;
    max_minutes: number;
    max_projects: number;
    max_storage: number;
    name: string;
    updated_at: string;
}

export type GetPlanRequest = {
    plan_id: string;
}

export type GetPlanResponse = {
    data: {
        id: string;
        type: string;
        attributes: {
            created_at: string;
            max_active_campaigns: number;
            max_collabs_per_project: number;
            max_configs_per_project: number;
            max_minutes: number;
            max_projects: number;
            max_storage: number;
            name: string;
            updated_at: string;
        };
    };
}

export async function getPlan(req: GetPlanRequest): Promise<{ success: boolean; plan?: Plan; error?: Error }> {
    const result = await request(`/v1/plans/${req.plan_id}`, {
        method: 'GET'
    })

    if (result.success && result.response) {
        try {
            const response: GetPlanResponse = await result.response.json()
            const data = response.data;

            const plan = {
                created_at: data.attributes.created_at,
                max_active_campaigns: data.attributes.max_active_campaigns,
                max_collabs_per_project: data.attributes.max_collabs_per_project,
                max_configs_per_project: data.attributes.max_configs_per_project,
                max_minutes: data.attributes.max_minutes,
                max_projects: data.attributes.max_projects,
                max_storage: data.attributes.max_storage,
                name: data.attributes.name,
                updated_at: data.attributes.updated_at
            }

            return { success: true, plan }
        } catch {
            return {
                success: false, error: { message: 'Failed to parse user plan data' }
            }
        }
    }

    return { success: false, error: result.error }
}
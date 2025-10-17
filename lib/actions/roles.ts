'use server'

import { request } from "@/lib/helpers";
import { Error } from "@/lib/types";

export type CollabRole = {
    role_id: string
    level: number
}

export type CollabRoleResponse = {
    data: Array<{
        attributes: {
            created_at: string,
            level: number,
            name: string,
            updated_at: string
        },
        id: string,
        type: string
    }>
}

export async function getCollabRoles(): Promise<{ success: boolean; roles?: CollabRole[]; error?: Error }> {
    const result = await request(`/v1/projects/collab-roles`, {
        method: 'GET',
    })

    if (result.success && result.response) {
        try {
            const data: CollabRoleResponse = await result.response.json()

            const roles: CollabRole[] = data.data.map((role) => ({
                role_id: role.id,
                level: role.attributes.level,
            }))

            return { success: true, roles }
        } catch {
            return { success: false, error: { message: 'Failed to parse roles data' } }
        }
    }

    return { success: false, error: result.error }
}
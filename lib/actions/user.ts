'use server'

import { request } from "./helpers";
import { Error } from "./types";

export type User = {
    name: string
    email: string
    provider: string
    avatar_url: string
    created_at: string
    updated_at: string
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
                name: data.data.attributes.name,
                email: data.data.attributes.email,
                provider: data.data.attributes.provider,
                avatar_url: data.data.attributes.avatar_url,
                created_at: data.data.attributes.created_at,
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

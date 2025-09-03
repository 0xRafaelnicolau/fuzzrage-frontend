'use server'

import { request } from "./helpers";
import { Installation, GetInstallationsResponse, Error } from "./types";

export async function createInstallation() {
    const result = await request(`/v1/user/installations/new`, {
        method: 'GET'
    })

    if (result.success && result.response) {
        return { success: true, url: result.response.url }
    }

    return { success: false, error: result.error }
}

export async function getInstallations(): Promise<{ success: boolean; installations?: Installation[]; error?: Error }> {
    const result = await request(`/v1/user/installations`, {
        method: 'GET'
    })

    if (result.success && result.response) {
        try {
            const data: GetInstallationsResponse = await result.response.json()

            const installations: Installation[] = data.data.map(installation => ({
                id: installation.id,
                target: installation.attributes.target,
                provider: installation.attributes.provider
            }))

            return { success: true, installations }
        } catch {
            return {
                success: false, error: { message: 'Failed to parse get installations data' }
            }
        }
    }

    return { success: false, error: result.error }
}
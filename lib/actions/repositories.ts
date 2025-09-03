'use server'

import { request } from "./helpers";
import { Repository, GetRepositoriesRequest, GetRepositoriesResponse, Error } from "./types";

export async function getRepositories(req: GetRepositoriesRequest): Promise<{ success: boolean; repositories?: Repository[]; error?: Error }> {
    const result = await request(`/v1/user/installations/${req.installation_id}/repos`, {
        method: 'GET',
    })

    if (result.success && result.response) {
        try {
            const data: GetRepositoriesResponse = await result.response.json()

            const repositories: Repository[] = data.data.map(repository => ({
                id: repository.id,
                name: repository.attributes.name,
            }))

            return { success: true, repositories }
        } catch {
            return {
                success: false, error: { message: 'Failed to parse repositories data' }
            }
        }
    }

    return { success: false, error: result.error }
} 
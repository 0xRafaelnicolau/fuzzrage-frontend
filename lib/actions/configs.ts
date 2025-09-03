'use server'

import { revalidatePath } from "next/cache";
import { request } from "./helpers";
import {
    Error,
    Config,
    CreateConfigRequest,
    CreateConfigResponse,
    GetConfigsRequest,
    GetConfigsResponse,
    UpdateConfigRequest,
    UpdateConfigResponse,
    DeleteConfigRequest,
} from "./types";

export async function createConfig(req: CreateConfigRequest) {
    const result = await request(`/v1/projects/${req.project_id}/configs`, {
        method: 'POST',
        body: JSON.stringify({
            data: {
                attributes: {
                    name: req.name,
                    content: req.config
                }
            }
        })
    })

    if (result.success && result.response) {
        try {
            const data: CreateConfigResponse = await result.response.json()

            const config: Config = {
                id: data.data.id,
                name: data.data.attributes.name,
                config: data.data.attributes.content,
                created_at: data.data.attributes.created_at
            }

            revalidatePath(`/project/${req.project_id}/settings/configs`)

            return { success: true, config: config }
        } catch {
            return { success: false, error: { message: 'Failed to parse create config data' } }
        }
    }

    return { success: false, error: result.error }
}

export async function getConfigs(req: GetConfigsRequest): Promise<{ success: boolean; configs?: Config[]; error?: Error }> {
    const result = await request(`/v1/projects/${req.project_id}/configs`, {
        method: 'GET'
    })

    if (result.success && result.response) {
        try {
            const data: GetConfigsResponse = await result.response.json()

            const configs: Config[] = data.data.map((config) => ({
                id: config.id,
                name: config.attributes.name,
                config: config.attributes.content,
                created_at: config.attributes.created_at
            }))

            return { success: true, configs: configs }
        } catch {
            return { success: false, error: { message: 'Failed to parse get configs data' } }
        }
    }

    return { success: false, error: result.error }
}

export async function updateConfig(req: UpdateConfigRequest): Promise<{ success: boolean; config?: Config; error?: Error }> {
    const result = await request(`/v1/projects/${req.project_id}/configs/${req.config_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            data: {
                attributes: {
                    name: req.name,
                    content: req.content
                }
            }
        })
    })

    if (result.success && result.response) {
        try {
            const data: UpdateConfigResponse = await result.response.json()

            const config: Config = {
                id: data.data.id,
                name: data.data.attributes.name,
                config: data.data.attributes.content,
                created_at: data.data.attributes.created_at
            }

            revalidatePath(`/project/${req.project_id}/settings/configs`)

            return { success: true, config: config }
        } catch {
            return { success: false, error: { message: 'Failed to parse update config data' } }
        }
    }

    return { success: false, error: result.error }
}


export async function deleteConfig(req: DeleteConfigRequest): Promise<{ success: boolean; error?: Error }> {
    const result = await request(`/v1/projects/${req.project_id}/configs/${req.config_id}`, {
        method: 'DELETE'
    })

    if (result.success && result.response) {
        revalidatePath(`/project/${req.project_id}/settings/configs`)

        return { success: true }
    }

    return { success: false, error: result.error }
}

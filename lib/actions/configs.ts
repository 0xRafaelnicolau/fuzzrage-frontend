'use server'

import { request } from "./helpers";
import { Config, CreateConfigRequest, CreateConfigResponse } from "./types";

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
                config: data.data.attributes.content
            }

            return { success: true, config: config }
        } catch {
            return { success: false, error: { message: 'Failed to parse create config data' } }
        }
    }

    return { success: false, error: result.error }
}
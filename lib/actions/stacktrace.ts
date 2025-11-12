'use server'

import { request } from "@/lib/helpers";
import { Error } from "@/lib/types";

export type StackTrace = {
    id: string;
    type: string;
    content: string;
}

export type GetStackTraceRequest = {
    project_id: string;
    campaign_id: string;
    property: string;
}

export type GetStackTraceResponse = {
    data: {
        attributes: {
            content: string;
        },
        id: string;
        type: string;
    }
}

export async function getStackTrace(req: GetStackTraceRequest): Promise<{ success: boolean; stackTrace?: StackTrace; error?: Error }> {
    const queryParams = new URLSearchParams();

    if (req.property) {
        queryParams.append('property', req.property);
    }

    const result = await request(`/v1/projects/${req.project_id}/campaigns/${req.campaign_id}/stacktrace${queryParams.toString() ? `?${queryParams.toString()}` : ''}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (result.success && result.response) {
        try {
            const data: GetStackTraceResponse = await result.response.json()

            const stacktrace: StackTrace = {
                id: data.data.id,
                type: data.data.type,
                content: data.data.attributes.content,
            }

            return { success: true, stackTrace: stacktrace }
        } catch {
            return { success: false, error: { message: 'Failed to parse get stack trace data' } }
        }
    }

    return { success: false, error: result.error }
}
import { cookies } from "next/headers";
import type { Error } from "./types";

export const BACKEND_URL = process.env.BACKEND_URL;

export async function getToken() {
    'use server'
    const store = await cookies()
    return store.get('jwt')?.value
}

export async function deleteToken() {
    'use server'
    const store = await cookies()
    store.delete('jwt')
}

export async function parseErrorResponse(response: Response): Promise<Error> {
    try {
        const data = await response.json()
        const firstError = data.errors?.[0]
        return firstError ? { message: firstError.detail } : { message: 'Unknown error occurred' }
    } catch {
        return { message: 'Failed to parse error response' }
    }
}

export async function request(url: string, options: RequestInit = {}) {
    'use server'

    const token = await getToken()
    if (!token) {
        return { success: false, error: { message: 'No token available' } }
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    try {
        const response = await fetch(`${BACKEND_URL}${url}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                ...options.headers
            },
            signal: controller.signal,
            ...options
        })

        if (!response.ok) {
            const error = await parseErrorResponse(response)
            return { success: false, error }
        }

        return { success: true, response }
    } catch (error) {
        clearTimeout(timeoutId)

        return {
            success: false,
            error: {
                message: error instanceof Error ? error.message : 'Request failed'
            }
        }
    } finally {
        clearTimeout(timeoutId)
    }
}
'use server'

import { cookies } from "next/headers";
import type { Error } from "./types";
import { BACKEND_URL } from "@/lib/constants";

export async function getToken() {
    const store = await cookies()
    return store.get('jwt')?.value
}

export async function setToken(token: string) {
    const store = await cookies()
    store.set('jwt', token, {
        httpOnly: true,
        secure: process.env.ENV === 'production',
        maxAge: 60 * 60 * 24 * 7
    })
}

export async function deleteToken() {
    const store = await cookies()
    store.delete('jwt')
}

export async function parseErrorResponse(response: Response): Promise<Error> {
    try {
        const data = await response.json()
        const firstError = data.errors?.[0]
        const message = firstError?.detail || 'Unknown error occurred'
        return { message: message.charAt(0).toUpperCase() + message.slice(1) }
    } catch {
        return { message: 'Failed to parse error response' }
    }
}

export async function request(url: string, options: RequestInit = {}) {
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
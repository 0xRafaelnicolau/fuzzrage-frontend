'use server'

import { BACKEND_URL, deleteToken, request } from "./helpers";
import { redirect } from "next/navigation";
import { Error } from "./types";

export async function login(provider: string) {
    const response = await fetch(`${BACKEND_URL}/v1/auth/${provider}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        redirect(response.url)
    }
}

export async function logout(): Promise<{ success: boolean; error?: Error }> {
    const response = await request('/v1/auth/logout', {
        method: 'POST'
    })

    if (response.success && response.response) {
        deleteToken()
        redirect('/')
    }

    return { success: false, error: response.error }
}
'use server'

import crypto from 'crypto';
import { BACKEND_URL, AUTH_API_SECRET } from "@/lib/constants";
import { deleteToken, request } from "@/lib/helpers";
import { redirect } from "next/navigation";
import { Error } from "@/lib/types";

export async function login(provider: string) {
    const now = new Date();
    const rounded = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        0, 0
    )).toISOString().replace(/\.\d{3}Z$/, 'Z');

    const secret = AUTH_API_SECRET || 'secret';
    const hmac = crypto.createHmac('sha256', secret).update(rounded).digest('hex');

    let response;

    try {
        response = await fetch(`${BACKEND_URL}/v1/auth/${provider}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-FUZZIT-TOKEN': hmac
            }
        })
    } catch {
        return { success: false, error: { message: 'Authentication failed' } }
    }

    if (response.ok) {
        redirect(response.url)
    } else {
        return { success: false, error: { message: 'Authentication was unsuccessful' } }
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
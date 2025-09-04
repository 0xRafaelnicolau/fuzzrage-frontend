'use server'

import crypto from 'crypto';
import { BACKEND_URL, AUTH_API_SECRET } from "@/lib/constants";
import { deleteToken, request } from "./helpers";
import { redirect } from "next/navigation";
import { Error } from "./types";

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

    const response = await fetch(`${BACKEND_URL}/v1/auth/${provider}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-FUZZRAGE-TOKEN': hmac
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
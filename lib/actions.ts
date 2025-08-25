'use server'

import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export async function login(provider: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/v1/auth/${provider}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        redirect(response.url)
    }
}

export async function logout() {
    const store = await cookies()
    const token = store.get('jwt')?.value

    const response = await fetch(`${process.env.BACKEND_URL}/v1/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if (response.ok) {
        store.delete('jwt')
        redirect('/')
    }
}
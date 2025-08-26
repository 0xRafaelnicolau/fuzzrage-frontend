'use server'

import { cookies } from "next/headers"

export type User = {
    name: string
    email: string
    provider: string
    avatar_url: string
}

export async function getUser(): Promise<User | null> {
    const store = await cookies()
    const token = store.get('jwt')?.value

    if (token) {
        const response = await fetch(`${process.env.BACKEND_URL}/v1/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (response.ok) {
            const data = await response.json()

            if (data?.data?.attributes) {
                return {
                    name: data.data.attributes.name,
                    email: data.data.attributes.email,
                    provider: data.data.attributes.provider,
                    avatar_url: data.data.attributes.avatar_url
                }
            }
        }
    }

    return null;
}

export type Installation = {
    id: string
    target: string
    provider: string
}

export async function getUserInstallations(): Promise<Installation[] | null> {
    const store = await cookies()
    const token = store.get('jwt')?.value

    if (token) {
        const response = await fetch(`${process.env.BACKEND_URL}/v1/user/installations`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (response.ok) {
            const data = await response.json()

            if (data?.data) {
                return data.data.map((installation: any) => ({
                    id: installation.id,
                    target: installation.attributes.target,
                    provider: installation.attributes.provider
                }))
            }
        }
    }

    return null;
}
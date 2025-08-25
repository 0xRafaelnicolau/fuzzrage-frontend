'use server'

import { cookies } from "next/headers"

export type User = {
    name: string
    email: string
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
                    avatar_url: data.data.attributes.avatar_url
                }
            }
        }
    }

    return null;
}
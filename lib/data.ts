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

export async function getInstallations(): Promise<Installation[] | null> {
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
                return data.data.map((installation: { id: string; attributes: { target: string; provider: string } }) => ({
                    id: installation.id,
                    target: installation.attributes.target,
                    provider: installation.attributes.provider
                }))
            }
        }
    }

    return null;
}

export type Repository = {
    id: string
    name: string
}

export async function getRepositories(installationId: string): Promise<Repository[] | null> {
    const store = await cookies()
    const token = store.get('jwt')?.value

    if (token) {
        const response = await fetch(`${process.env.BACKEND_URL}/v1/user/installations/${installationId}/repos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (response.ok) {
            const data = await response.json()

            if (data?.data) {
                return data.data.map((repository: { id: string; attributes: { name: string } }) => ({
                    id: repository.id,
                    name: repository.attributes.name,
                }))
            }
        }
    }

    return null;
}
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

export async function installApp() {
    const store = await cookies()
    const token = store.get('jwt')?.value

    const response = await fetch(`${process.env.BACKEND_URL}/v1/user/installations/new`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if (response.ok) {
        return response.url
    }
}

export async function createProject(installationId: string, repoName: string, repositoryId: string, repoOwner: string) {
    const store = await cookies()
    const token = store.get('jwt')?.value

    const response = await fetch(`${process.env.BACKEND_URL}/v1/projects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            data: {
                attributes: {
                    name: repoName,
                    installation_id: parseInt(installationId),
                    repository_id: parseInt(repositoryId),
                    repository_owner: repoOwner
                }
            }
        })
    })

    if (response.ok) {
        const data = await response.json()
        redirect(`/project/${data.data.id}`)
    }
}

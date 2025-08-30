'use server'

import { cookies } from "next/headers"

const BACKEND_URL = process.env.BACKEND_URL;

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
        const response = await fetch(`${BACKEND_URL}/v1/user`, {
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
        const response = await fetch(`${BACKEND_URL}/v1/user/installations`, {
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
        const response = await fetch(`${BACKEND_URL}/v1/user/installations/${installationId}/repos`, {
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


export type Project = {
    id: string
    type: string
    attributes: {
        created_at: string
        installation_id: number
        name: string
        repository_name: string
        repository_owner: string
        repository_id: number
        updated_at: string
    }
}

export async function getProject(projectId: string): Promise<Project | null> {
    const store = await cookies()
    const token = store.get('jwt')?.value

    if (token) {
        const response = await fetch(`${process.env.BACKEND_URL}/v1/projects/${projectId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (response.ok) {
            const data = await response.json()

            if (data?.data) {
                return {
                    id: data.data.id,
                    type: data.data.type,
                    attributes: {
                        created_at: data.data.attributes.created_at,
                        installation_id: data.data.attributes.installation_id,
                        name: data.data.attributes.name,
                        repository_name: data.data.attributes.repository_name,
                        repository_owner: data.data.attributes.repository_owner,
                        repository_id: data.data.attributes.repository_id,
                        updated_at: data.data.attributes.updated_at
                    }
                }
            }
        }
    }

    return null;
}

export type GetProjectsParams = {
    page?: number;
    size?: number;
    sort?: string;
    name_like?: string;
    created_at_gte?: string;
    created_at_lte?: string;
}

export async function getProjects(params?: GetProjectsParams): Promise<Project[] | null> {
    const store = await cookies()
    const token = store.get('jwt')?.value

    if (token) {
        // Build query parameters
        const queryParams = new URLSearchParams();

        if (params?.page !== undefined) {
            queryParams.append('page', params.page.toString());
        }

        if (params?.size !== undefined) {
            queryParams.append('size', params.size.toString());
        }

        if (params?.sort) {
            queryParams.append('sort', params.sort);
        }

        if (params?.name_like) {
            queryParams.append('name_like', params.name_like);
        }

        if (params?.created_at_gte) {
            queryParams.append('created_at_gte', params.created_at_gte);
        }

        if (params?.created_at_lte) {
            queryParams.append('created_at_lte', params.created_at_lte);
        }

        const url = `${BACKEND_URL}/v1/projects${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (response.ok) {
            const data = await response.json()

            if (data?.data) {
                return data.data.map((project: { id: string; type: string; attributes: { name: string; created_at: string; installation_id: number; owner: number; repository_id: number; updated_at: string } }) => ({
                    id: project.id,
                    type: project.type,
                    attributes: {
                        created_at: project.attributes.created_at,
                        installation_id: project.attributes.installation_id,
                        name: project.attributes.name,
                        owner: project.attributes.owner,
                        repository_id: project.attributes.repository_id,
                        updated_at: project.attributes.updated_at
                    }
                }))
            }
        }
    }

    return null;
}
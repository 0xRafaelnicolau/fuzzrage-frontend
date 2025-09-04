'use server'

import { revalidatePath } from "next/cache";
import { request } from "./helpers";
import {
    Project,
    CreateProjectRequest,
    CreateProjectResponse,
    GetProjectRequest,
    GetProjectResponse,
    GetProjectsRequest,
    GetProjectsResponse,
    Error,
    ProjectOwner,
    GetProjectOwnerRequest,
    GetProjectOwnerResponse,
    UpdateProjectRequest,
    UpdateProjectResponse,
} from "./types";

export async function createProject(req: CreateProjectRequest): Promise<{ success: boolean; project?: Project; error?: Error }> {
    const result = await request(`/v1/projects`, {
        method: 'POST',
        body: JSON.stringify({
            data: {
                attributes: {
                    name: req.name,
                    installation_id: req.installation_id,
                    repository_id: req.repository_id,
                    repository_owner: req.repository_owner
                }
            }
        })
    })

    if (result.success && result.response) {
        try {
            const data: CreateProjectResponse = await result.response.json()

            const project: Project = {
                id: data.data.id,
                type: data.data.type,
                attributes: {
                    created_at: data.data.attributes.created_at,
                    installation_id: data.data.attributes.installation_id,
                    name: data.data.attributes.name,
                    owner: data.data.attributes.owner,
                    repository_name: data.data.attributes.repository_name,
                    repository_owner: data.data.attributes.repository_owner,
                    repository_id: data.data.attributes.repository_id,
                    updated_at: data.data.attributes.updated_at
                }
            }

            return { success: true, project }
        } catch {
            return { success: false, error: { message: 'Failed to parse create project data' } }
        }
    }

    return { success: false, error: result.error }
}

export async function getProject(req: GetProjectRequest): Promise<{ success: boolean; project?: Project; error?: Error }> {
    const result = await request(`/v1/projects/${req.projectId}`, {
        method: 'GET'
    })

    if (result.success && result.response) {
        try {
            const data: GetProjectResponse = await result.response.json()

            const project: Project = {
                id: data.data.id,
                type: data.data.type,
                attributes: {
                    created_at: data.data.attributes.created_at,
                    installation_id: data.data.attributes.installation_id,
                    name: data.data.attributes.name,
                    owner: data.data.attributes.owner,
                    repository_name: data.data.attributes.repository_name,
                    repository_owner: data.data.attributes.repository_owner,
                    repository_id: data.data.attributes.repository_id,
                    updated_at: data.data.attributes.updated_at
                }
            }

            return { success: true, project }
        } catch {
            return { success: false, error: { message: 'Failed to parse get project data' } }
        }
    }

    return { success: false, error: result.error }
}

export async function getProjects(params?: GetProjectsRequest): Promise<{ success: boolean; projects?: Project[]; error?: Error }> {
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

    const result = await request(`/v1/projects${queryParams.toString() ? `?${queryParams.toString()}` : ''}`, {
        method: 'GET',
    })

    if (result.success && result.response) {
        try {
            const data: GetProjectsResponse = await result.response.json()

            const projects: Project[] = data.data.map(project => ({
                id: project.id,
                type: project.type,
                attributes: {
                    created_at: project.attributes.created_at,
                    installation_id: project.attributes.installation_id,
                    name: project.attributes.name,
                    owner: project.attributes.owner,
                    repository_id: project.attributes.repository_id,
                    repository_name: project.attributes.repository_name,
                    repository_owner: project.attributes.repository_owner,
                    updated_at: project.attributes.updated_at
                }
            }))

            return { success: true, projects }
        } catch {
            return { success: false, error: { message: 'Failed to parse get projects data' } }
        }
    }

    return { success: false, error: result.error }
}

export async function getProjectOwner(req: GetProjectOwnerRequest): Promise<{ success: boolean; owner?: ProjectOwner; error?: Error }> {
    const result = await request(`/v1/projects/${req.projectId}/owner`, {
        method: 'GET'
    })

    if (result.success && result.response) {
        try {
            const data: GetProjectOwnerResponse = await result.response.json()

            const owner = {
                name: data.data.attributes.name,
                email: data.data.attributes.email,
                provider: data.data.attributes.provider,
                avatar_url: data.data.attributes.avatar_url,
                created_at: data.data.attributes.created_at,
                updated_at: data.data.attributes.updated_at
            }

            return { success: true, owner: owner }
        } catch {
            return {
                success: false, error: { message: 'Failed to parse project owner data' }
            }
        }
    }

    return { success: false, error: result.error }
}

export async function updateProject(req: UpdateProjectRequest): Promise<{ success: boolean; project?: Project; error?: Error }> {
    const result = await request(`/v1/projects/${req.projectId}`, {
        method: 'PUT',
        body: JSON.stringify({
            data: {
                attributes: {
                    name: req.name
                }
            }
        })
    })

    if (result.success && result.response) {
        try {
            const data: UpdateProjectResponse = await result.response.json()

            const project: Project = {
                id: data.data.id,
                type: data.data.type,
                attributes: {
                    created_at: data.data.attributes.created_at,
                    installation_id: data.data.attributes.installation_id,
                    name: data.data.attributes.name,
                    owner: data.data.attributes.owner,
                    repository_name: data.data.attributes.repository_name,
                    repository_owner: data.data.attributes.repository_owner,
                    repository_id: data.data.attributes.repository_id,
                    updated_at: data.data.attributes.updated_at
                }
            }

            revalidatePath(`/project/${req.projectId}/settings`)

            return { success: true, project }
        } catch {
            return {
                success: false, error: { message: 'Failed to parse project data' }
            }
        }
    }

    return { success: false, error: result.error }
}
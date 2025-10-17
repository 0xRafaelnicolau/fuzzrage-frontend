'use server'

import { revalidatePath } from "next/cache";
import { request } from "@/lib/helpers";
import { Error } from "@/lib/types";

export type TeamMember = {
    collaborator_id: string
    user_id: string
    username: string
    avatar_url: string
    role_level: number
}

export type CreateInviteRequest = {
    project_id: string
    email: string
    role: number
}

export async function createInvite(req: CreateInviteRequest): Promise<{ success: boolean; error?: Error }> {
    const result = await request(`/v1/projects/${req.project_id}/collabs/invite`, {
        method: 'POST',
        body: JSON.stringify({
            data: {
                attributes: {
                    email: req.email,
                    role_id: req.role,
                }
            }
        })
    })

    if (result.success && result.response) {
        return { success: true }
    }

    return { success: false, error: result.error }
}

export type AcceptInviteRequest = {
    project_id: string
    invite_code: string
}

export async function acceptInvite(req: AcceptInviteRequest): Promise<{ success: boolean; error?: Error }> {
    const result = await request(`/v1/projects/${req.project_id}/collabs`, {
        method: 'POST',
        body: JSON.stringify({
            data: {
                attributes: {
                    code: req.invite_code
                }
            }
        })
    })

    if (result.success && result.response) {
        return { success: true }
    }

    return { success: false, error: result.error }
}

export type GetTeamMembersRequest = {
    projectId: string
}

export type GetTeamMembersResponse = {
    data: Array<{
        attributes: {
            avatar_url: string,
            created_at: string,
            project_id: number,
            role: string,
            role_level: number,
            updated_at: string,
            user_id: number,
            username: string
        },
        id: string,
        type: string
    }
    >
}

export async function getTeamMembers(req: GetTeamMembersRequest): Promise<{ success: boolean; members?: TeamMember[]; error?: Error }> {
    const result = await request(`/v1/projects/${req.projectId}/collabs`, {
        method: 'GET',
    })

    if (result.success && result.response) {
        try {
            const data: GetTeamMembersResponse = await result.response.json()

            const members: TeamMember[] = data.data.map((member) => ({
                collaborator_id: member.id,
                user_id: member.id,
                role_level: member.attributes.role_level,
                username: member.attributes.username,
                avatar_url: member.attributes.avatar_url,
            }))

            return { success: true, members }
        } catch {
            return { success: false, error: { message: 'Failed to parse get team members data' } }
        }
    }

    return { success: false, error: result.error }
}

export type DeleteTeamMemberRequest = {
    projectId: string
    collaborator_id: string
}

export async function deleteTeamMember(req: DeleteTeamMemberRequest): Promise<{ success: boolean; error?: Error }> {
    const result = await request(`/v1/projects/${req.projectId}/collabs/${req.collaborator_id}`, {
        method: 'DELETE',
    })

    if (result.success && result.response) {
        revalidatePath(`/project/${req.projectId}/settings/team`)
        return { success: true }
    }

    return { success: false, error: result.error }
}
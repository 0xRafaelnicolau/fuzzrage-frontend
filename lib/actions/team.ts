'use server'

import { revalidatePath } from "next/cache";
import { request } from "./helpers";
import {
    Error,
    InviteRequest,
    AcceptInviteRequest,
    CollabRole,
    CollabRoleResponse,
    TeamMember,
    GetTeamMembersRequest,
    GetTeamMembersResponse,
    DeleteTeamMemberRequest
} from "./types";

export async function getCollabRoles(): Promise<{ success: boolean; roles?: CollabRole[]; error?: Error }> {
    const result = await request(`/v1/projects/collab-roles`, {
        method: 'GET',
    })

    if (result.success && result.response) {
        const data: CollabRoleResponse = await result.response.json()

        const roles: CollabRole[] = data.data.map((role) => ({
            role_id: role.id,
            level: role.attributes.level,
        }))

        return { success: true, roles }
    }

    return { success: false, error: result.error }
}

export async function createInvite(req: InviteRequest): Promise<{ success: boolean; error?: Error }> {
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

export async function getTeamMembers(req: GetTeamMembersRequest): Promise<{ success: boolean; members?: TeamMember[]; error?: Error }> {
    const result = await request(`/v1/projects/${req.project_id}/collabs`, {
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

export async function deleteTeamMember(req: DeleteTeamMemberRequest): Promise<{ success: boolean; error?: Error }> {
    const result = await request(`/v1/projects/${req.project_id}/collabs/${req.collaborator_id}`, {
        method: 'DELETE',
    })

    if (result.success && result.response) {
        revalidatePath(`/project/${req.project_id}/settings/team`)
        return { success: true }
    }

    return { success: false, error: result.error }
}
export type Error = {
    message: string
}

/*//////////////////////////////////////////////////////////////
                        TEAM
//////////////////////////////////////////////////////////////*/

export type CreateInviteRequest = {
    project_id: string
    email: string
    role: number
}

export type AcceptInviteRequest = {
    project_id: string
    invite_code: string
}

export type TeamMember = {
    collaborator_id: string
    user_id: string
    username: string
    avatar_url: string
    role_level: number
}

export type GetTeamMembersRequest = {
    project_id: string
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

export type DeleteTeamMemberRequest = {
    project_id: string
    collaborator_id: string
}
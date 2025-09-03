/*//////////////////////////////////////////////////////////////
                        ERRORS
//////////////////////////////////////////////////////////////*/

export type Error = {
    message: string
}

/*//////////////////////////////////////////////////////////////
                        USER
//////////////////////////////////////////////////////////////*/

export type User = {
    name: string
    email: string
    provider: string
    avatar_url: string
    created_at: string
    updated_at: string
}

export type GetUserResponse = {
    data: {
        id: string
        type: string
        attributes: User
    }
}

/*//////////////////////////////////////////////////////////////
                        INSTALLATION
//////////////////////////////////////////////////////////////*/

export type Installation = {
    id: string
    target: string
    provider: string
}

export type GetInstallationsResponse = {
    data: Array<{
        id: string
        type: string
        attributes: {
            provider: string
            target: string
        }
    }>
}

/*//////////////////////////////////////////////////////////////
                        REPOSITORIES
//////////////////////////////////////////////////////////////*/

export type Repository = {
    id: string
    name: string
}

export type GetRepositoriesRequest = {
    installation_id: string
}

export type GetRepositoriesResponse = {
    data: Array<{
        id: string
        type: string
        attributes: {
            name: string
        }
    }>
}

/*//////////////////////////////////////////////////////////////
                        PROJECTS
//////////////////////////////////////////////////////////////*/


export type Project = {
    id: string
    type: string
    attributes: {
        created_at: string
        installation_id: number
        name: string
        owner: number
        repository_id: number
        repository_name: string
        repository_owner: string
        updated_at: string
    }
}

export type CreateProjectRequest = {
    installation_id: number
    name: string
    repository_id: number
    repository_owner: string
}

export type CreateProjectResponse = {
    data: {
        id: string
        type: string
        attributes: {
            created_at: string
            installation_id: number
            name: string
            owner: number
            repository_id: number
            repository_name: string
            repository_owner: string
            updated_at: string
        }
    }
}

export type GetProjectRequest = {
    projectId: string
}

export type GetProjectResponse = {
    data: {
        id: string
        type: string
        attributes: {
            created_at: string
            installation_id: number
            name: string
            owner: number
            repository_id: number
            repository_name: string
            repository_owner: string
            updated_at: string
        }
    }
}

export type GetProjectsRequest = {
    page?: number;
    size?: number;
    sort?: string;
    name_like?: string;
    created_at_gte?: string;
    created_at_lte?: string;
}

export type GetProjectsResponse = {
    data: Array<{
        id: string
        type: string
        attributes: {
            created_at: string
            installation_id: number
            name: string
            owner: number
            repository_id: number
            repository_name: string
            repository_owner: string
            updated_at: string
        }
    }>
}

export type ProjectOwner = {
    name: string
    email: string
    provider: string
    avatar_url: string
    created_at: string
    updated_at: string
}

export type GetProjectOwnerRequest = {
    projectId: string
}

export type GetProjectOwnerResponse = {
    data: {
        id: string
        type: string
        attributes: ProjectOwner
    }
}


/*//////////////////////////////////////////////////////////////
                        CONFIGS
//////////////////////////////////////////////////////////////*/

export type Config = {
    id: string
    name: string
    config: string
    created_at: string
}

export type CreateConfigRequest = {
    project_id: string
    name: string
    config: string
}

export type CreateConfigResponse = {
    data: {
        attributes: {
            content: string,
            created_at: string
            name: string
            project_id: number
            updated_at: string
        },
        id: string
        type: string
    }
}

export type GetConfigsRequest = {
    project_id: string
}

export type GetConfigsResponse = {
    data: Array<{
        attributes: {
            content: string
            created_at: string
            name: string
            project_id: number
            updated_at: string
        },
        id: string
        type: string
    }>
}

export type UpdateConfigRequest = {
    project_id: string
    config_id: string
    name: string
    content: string
}

export type UpdateConfigResponse = {
    data: {
        attributes: {
            content: string
            created_at: string
            name: string
            project_id: number
            updated_at: string
        }
        id: string
        type: string
    }
}

export type DeleteConfigRequest = {
    project_id: string
    config_id: string
}

/*//////////////////////////////////////////////////////////////
                        TEAM
//////////////////////////////////////////////////////////////*/

export type InviteRequest = {
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

/*//////////////////////////////////////////////////////////////
                        ROLES
//////////////////////////////////////////////////////////////*/

export type CollabRole = {
    role_id: string
    level: number
}

export type CollabRoleResponse = {
    data: Array<{
        attributes: {
            created_at: string,
            level: number,
            name: string,
            updated_at: string
        },
        id: string,
        type: string
    }>
}
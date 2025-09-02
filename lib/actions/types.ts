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

/*//////////////////////////////////////////////////////////////
                        CONFIGS
//////////////////////////////////////////////////////////////*/

export type Config = {
    id: string
    name: string
    config: string
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
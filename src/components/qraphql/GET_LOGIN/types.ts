export interface LoginType {
    viewer: {
        login: string
        name: string
        avatarUrl: string
        url: string
        bio: string
        repositories: { edges: RepositoriesType[] }
    }
}

export interface RepositoriesType {
    node: BaseRepositoryNode
}

export interface RepositoryNode extends BaseRepositoryNode{

}

export interface BaseRepositoryNode {
    id: string
    name: string
    url: string
    viewerHasStarred: boolean
    stargazers: {
        totalCount: number
    }
    owner: {
        id: string
        login: string
    }
    watchers?: {
        totalCount: number
    }
    descriptionHTML?: string
    forks?: {
        totalCount: number
    }
    updatedAt?: string
}

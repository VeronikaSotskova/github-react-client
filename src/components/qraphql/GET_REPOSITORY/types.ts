export interface RepositoryType {
    repository: Repository
}

export interface Repository {
    id: string
    name: string
    createdAt: string
    isArchived: string
    isPrivate: string
    url: string
    owner: {
        id: string
        login: string
    }
    description: string
    issues: {
        totalCount: string
    }
    stargazers: {
        totalCount: string
    }
    watchers: {
        totalCount: string
    }
    forks: {
        totalCount: string
    }
}

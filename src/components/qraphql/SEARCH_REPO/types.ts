import { BaseRepositoryNode } from '../GET_LOGIN/types';

export interface RepositorySearchType {
    search: {
        repositoryCount: number
        edges: RepositorySearchNode[]
    }
}

export interface RepositorySearchNode {
    node: BaseRepositoryNode
}

export interface SearchRepositoryNode extends BaseRepositoryNode {
    owner: {
        id: string
        login: string
    }
    descriptionHTML: string
    forks: {
        totalCount: number
    }
    updatedAt: string
}


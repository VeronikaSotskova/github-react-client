import { BaseRepositoryNode } from '../GET_LOGIN/types';

export interface UserType {
    node: UserNode
}

export interface UserNode {
    id: string
    name: string
    login: string
    avatarUrl: string
    url: string
    bio: string
    viewerIsFollowing: boolean
    repositories: { edges: RepositoriesType[] }
}

export interface RepositoriesType {
    node: BaseRepositoryNode
}

export interface UserRepositoriesNode extends BaseRepositoryNode {
    watchers: {
        totalCount: number
    }
}

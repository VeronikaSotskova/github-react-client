export interface SearchUserType {
    search: {
        edges: SearchUserNode[]
    }
}


export interface SearchUserNode {
    node: {
        name: string
        login: string
        id: string
        url: string
        bio: string
        avatarUrl: string
    }
}

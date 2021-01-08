export interface FollowType {
    followUser: FollowBodyType
}

export interface UnFollowType {
    unfollowUser: FollowBodyType
}

export interface FollowBodyType {
    user: {
        id: string
        login: string
        name: string
        avatarUrl: string
        url: string
        bio: string
        viewerIsFollowing: boolean
    }
}

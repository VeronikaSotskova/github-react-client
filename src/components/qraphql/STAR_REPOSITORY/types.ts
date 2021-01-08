export interface StarRepoType {
    addStar: StarRepoBody
}

export interface UnStarRepoType {
    removeStar: StarRepoBody
}

export interface StarRepoBody {
    starrable: {
        id: string
        viewerHasStarred: boolean
        stargazers: {
            totalCount: number
        }
    }
}

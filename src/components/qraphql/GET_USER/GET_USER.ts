import gql from 'graphql-tag';

export const GET_USER = gql`
query($id: ID!){
    node(id: $id) {
        ... on User {
            id
            name
            login
            avatarUrl
            url
            bio
            viewerIsFollowing          
                repositories(first: 10 orderBy: { direction: DESC, field: STARGAZERS }) {
                edges {
                    node {
                        id
                        name
                        url
                         owner {
                          id
                          login
                        }
                        stargazers {
                          totalCount
                        }
                        viewerHasStarred
                        watchers {
                          totalCount
                        }
                    }
                }
            }
        }
    }
}
`;

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { Url } from '../util';

const httpLink = new HttpLink({uri: Url.API});

const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('token');

    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : ''
        }
    });

    return forward(operation);
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export enum Url {
    USER = '/user/:id',
    SEARCH_USER = '/searchUser',
    REPOSITORY = '/repository/:login/:name',
    SEARCH_REPOSITORY = '/searchRepository',
    PROFILE = '/profile',
    MAIN = '/main',
    ROOT = '/',
    NO_LOGIN = '/no-login',
    API = 'https://api.github.com/graphql',
}

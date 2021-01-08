import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { NoMatch } from './components/NoMatch';
import { Url } from './util';
import { NoLogin } from './components/NoLogin';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Profile } from './components/Profile';
import { ApolloProvider } from '@apollo/client';
import { client } from './api/Client';
import { Main } from './components/MainPage';
import { User } from './components/Search';
import { SearchByUser } from './components/Search';
import { Repository } from './components/Search';
import { SearchByRepository } from './components/Search';
import { ButtonAppBar } from './components/Header';

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <ButtonAppBar/>
                <Switch>
                    <ProtectedRoute path={Url.USER} component={User}/>
                    <ProtectedRoute path={Url.SEARCH_USER} component={SearchByUser}/>
                    <ProtectedRoute path={Url.REPOSITORY} component={Repository}/>
                    <ProtectedRoute path={Url.SEARCH_REPOSITORY} component={SearchByRepository}/>
                    <ProtectedRoute path={Url.PROFILE} component={Profile}/>
                    <ProtectedRoute path={Url.MAIN} component={Main}/>
                    <ProtectedRoute path={Url.ROOT} component={Main} />
                    <Route path={Url.NO_LOGIN} component={NoLogin}/>
                    <Route path="*" component={NoMatch}/>
                </Switch>
            </Router>
        </ApolloProvider>
    );
}

export default App;

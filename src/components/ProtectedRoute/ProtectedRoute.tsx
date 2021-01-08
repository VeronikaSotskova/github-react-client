import React, { FC } from 'react';
import { Route } from 'react-router-dom';
import { Url } from '../../util';
import { Main } from '../MainPage';


type PrivateRouteProps = {
    path: string | string[],
    exact?: boolean,
    component: any;
}

export const ProtectedRoute: FC<PrivateRouteProps> = ({...params}) => {
    const userToken = localStorage.getItem('token');
    console.log(userToken)
    return userToken !== null ? <Route {...params} /> : <Route path={Url.MAIN} component={Main}><Main/> </Route>
}

import React, { FC, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { GET_LOGIN } from '../qraphql/GET_LOGIN/GET_LOGIN';
import Loading from '../Loading/Loading';
import { LoginType } from '../qraphql/GET_LOGIN/types';


import { useQuery } from '@apollo/client';
import { RepositoryList } from '../RepositoriesList';

const emptyUserData: LoginType = {
    viewer: {avatarUrl: '', bio: '', login: '', name: '', repositories: {edges: []}, url: ''}
}

export const Profile: FC = () => {

    const [userData, setUserData] = useState<LoginType>(emptyUserData);

    const {loading, data} = useQuery<LoginType>(GET_LOGIN);

    useEffect(() => {
        if (!loading) {
            setUserData(data ?? emptyUserData);
        }
    }, [loading, data]);


    return (
        <>
            {loading && <Loading/>}
            <div>
                <Paper style={{
                    width: 300,
                    height: 300,
                    margin: '1rem auto'
                }}>
                    <Avatar src={userData.viewer?.avatarUrl}
                            variant="rounded"
                            style={{
                                width: 300,
                                height: 200,
                            }}/>
                    <Typography variant="h5">
                        {userData?.viewer?.name}
                    </Typography>
                    <Typography component="p">
                        {userData?.viewer?.login}
                    </Typography>
                </Paper>

                <Paper>
                    <Paper>
                        <RepositoryList data={userData?.viewer.repositories.edges}/>
                    </Paper>
                </Paper>
            </div>
        </>
    );
}

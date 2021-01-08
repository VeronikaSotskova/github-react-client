import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { GET_USER } from '../qraphql/GET_USER/GET_USER';
import { useQuery } from '@apollo/client';
import { UserNode, UserType } from '../qraphql/GET_USER/types';
import Loading from '../Loading/Loading';
import { RepositoryList } from '../RepositoriesList';
import { Follow, Unfollow } from '../Follow';

const emptyData: UserNode = {
    avatarUrl: '', bio: '', id: '', login: '', name: '', repositories: {edges: []}, url: '', viewerIsFollowing: false

}
export const User: FC = () => {
    const {id} = useParams<{ id: string }>();

    const [userData, setUserData] = useState<UserNode>(emptyData);

    const {data, loading} = useQuery<UserType>(GET_USER, {
        variables: {
            id
        }
    })

    useEffect(() => {
        if (!loading) {
            setUserData(data?.node ?? emptyData);
        }
    }, [loading, data])

    return (
        <>
            {loading ? <Loading/> :
                <div>
                    <Paper style={{
                        width: '300px',
                        height: '430px',
                        margin: '0 auto'
                    }}>
                        <Avatar src={userData?.avatarUrl}
                                variant="rounded"
                                style={{
                                    width: '300px',
                                    height: '340px'
                                }}/>
                        <Typography variant="h5" component="h3">
                            {userData?.name}
                        </Typography>
                        <Typography component="p">
                            {userData?.login}
                        </Typography>
                        <Typography>
                            {userData?.viewerIsFollowing ? (<Unfollow id={userData.id}/>) : (
                                <Follow id={userData.id}/>)}
                        </Typography>
                    </Paper>
                    <Paper>
                        <Paper>
                            <RepositoryList data={userData?.repositories.edges}/>
                        </Paper>
                    </Paper>
                </div>
            }
        </>

    );


};

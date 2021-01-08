import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { GET_REPOSITORY } from '../qraphql/GET_REPOSITORY/GET_REPOSITORY';
import { useQuery } from '@apollo/client';
import { Repository as RepositoryNode, RepositoryType } from '../qraphql/GET_REPOSITORY/types';
import Loading from '../Loading/Loading';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CallSplitIcon from '@material-ui/icons/CallSplit';

const emptyData: RepositoryNode = {
    createdAt: '',
    description: '',
    forks: {totalCount: ''},
    id: '',
    isArchived: '',
    isPrivate: '',
    issues: {totalCount: ''},
    name: '',
    owner: {id: '', login: ''},
    stargazers: {totalCount: ''},
    url: '',
    watchers: {totalCount: ''}

}
const iconStyle = {
    fontSize: 18,
    marginRight: 4,
}

export const Repository: FC = () => {
    let {login, name} = useParams<{ login: string, name: string }>();

    const [repoData, setRepoData] = useState<RepositoryNode>(emptyData)

    const {data, loading} = useQuery<RepositoryType>(GET_REPOSITORY, {variables: {login: login, repo: name}})

    useEffect(() => {
        if (!loading) {
            setRepoData(data?.repository ?? emptyData);
        }
    }, [loading, data])

    return (
        <>
            {loading ? <Loading/> :
                <div style={{
                    width: 400,
                    height: 200,
                    margin: '0 auto',
                    marginTop: '2rem',
                }}>
                    <Typography variant="h5">
                        Name: {repoData?.name}
                    </Typography>
                    <Typography variant="h5" style={{marginBottom: 20}}>
                        Owner: {repoData?.owner?.login}
                    </Typography>
                    <Typography>
                        Url: <a href={repoData.url} target="_blank" rel="noreferrer">{repoData.url}</a>
                    </Typography>
                    <Typography component="p" style={{marginBottom: 20}}>
                        Description: {repoData?.description}
                    </Typography>
                    <Typography component="p" >
                        Issues: {repoData?.issues.totalCount}
                    </Typography>
                    <Typography component="p">
                        <VisibilityIcon style={iconStyle}/>
                        Watchers: {repoData?.watchers?.totalCount}
                    </Typography>
                    <Typography component="p">
                        <FavoriteIcon style={iconStyle}/>
                        Stars: {repoData?.stargazers?.totalCount}
                    </Typography>
                    <Typography component="p">
                        <CallSplitIcon style={iconStyle}/>
                        Forks: {repoData?.forks?.totalCount}
                    </Typography>
                </div>
            }
        </>
    );
};

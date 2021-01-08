import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { SEARCH_REPO } from '../qraphql/SEARCH_REPO/SEARCH_REPO';
import { useQuery } from '@apollo/client';
import { RepositorySearchType } from '../qraphql/SEARCH_REPO/types';
import { RepoList } from './RepoList';
import Loading from '../Loading/Loading';


const emptyData: RepositorySearchType = {
    search: {edges: [], repositoryCount: 0}
}

export const SearchByRepository: FC = () => {
    const [input, setInput] = useState<string>('');
    const [repoData, setRepoData] = useState<RepositorySearchType>(emptyData);

    const {loading, data} = useQuery<RepositorySearchType>(SEARCH_REPO, {
        variables: {
            queryString: input
        }
    });

    useEffect(() => {
        if (!loading) {
            setRepoData(data ?? emptyData)
        }
    }, [loading, data])


    const handleChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        setInput(event.target.value);
    }, [])

    return (
        <>
            <div style={{width: '50%', margin: '1rem auto'}}>
                <TextField
                    id="standard-basic"
                    placeholder="Search repository"
                    value={input}
                    fullWidth
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '100px'
                    }}
                    onChange={handleChange}/>
            </div>
            {loading ? <Loading/> : <RepoList data={repoData.search.edges}/>}
        </>
    )
};

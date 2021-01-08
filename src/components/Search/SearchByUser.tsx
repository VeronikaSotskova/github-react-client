import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { SEARCH_USER } from '../qraphql/SEARCH_USER/SEARCH_USER';
import { useQuery } from '@apollo/client';
import { SearchUserType } from '../qraphql/SEARCH_USER/types';
import { UserList } from './UserList';
import Loading from '../Loading/Loading';

const emptyData: SearchUserType = {
    search: {edges: []}

}

export const SearchByUser: FC = () => {
    const [input, setInput] = useState('');
    const [usersData, setUsersData] = useState<SearchUserType>(emptyData);


    const {data, loading} = useQuery<SearchUserType>(SEARCH_USER, {variables: {queryString: input}})

    useEffect(() => {
        if (!loading) {
            setUsersData(data ?? emptyData);
        }
    }, [loading, data]);

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
            {loading ? <Loading/> : <UserList data={usersData.search.edges}/>}
        </>
    )
};

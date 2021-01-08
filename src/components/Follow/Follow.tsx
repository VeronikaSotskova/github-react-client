import React, { FC, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { useMutation } from '@apollo/client';
import { UnFollowType } from '../qraphql/FOLLOW/types';
import { UN_FOLLOW } from '../qraphql/FOLLOW/UNFOLLOW';

type Props = {
    id: string
}

export const Follow: FC<Props> = ({id}) => {

    const [follow] = useMutation<UnFollowType>(UN_FOLLOW);


    const handleClick = useCallback(() => {
        follow({variables: {id}})
    }, [follow, id],)


    return (
        <Button color="primary"
                onClick={handleClick}
                style={{
                    width: 300,
                    backgroundColor: '#2088ff'
                }}
        >Follow</Button>
    )
};

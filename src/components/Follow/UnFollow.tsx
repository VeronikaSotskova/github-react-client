import React, { FC, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { UN_FOLLOW } from '../qraphql/FOLLOW/UNFOLLOW';
import { useMutation } from '@apollo/client';
import { UnFollowType } from '../qraphql/FOLLOW/types';


type Props = {
    id: string
}

export const Unfollow: FC<Props> = ({id}) => {


    const [unfollow] = useMutation<UnFollowType>(UN_FOLLOW);


    const handleClick = useCallback(() => {
        unfollow({variables: {id}})
    }, [unfollow, id],)

    return (
        <Button color="primary"
                onClick={handleClick}
                style={{
                    width: 300,
                    backgroundColor: '#C0C0C0'
                }}
        >
            Unfollow
        </Button>
    );
};

import React, { FC, useCallback } from 'react';
import { UNSTAR_REPOSITORY } from '../qraphql/STAR_REPOSITORY/UNSTAR';
import { RepositoryNode } from '../qraphql/GET_LOGIN/types';
import { useMutation } from '@apollo/client';
import { StarRepoType } from '../qraphql/STAR_REPOSITORY/types';
import { SearchRepositoryNode } from '../qraphql/SEARCH_REPO/types';
import FavoriteIcon from '@material-ui/icons/Favorite';

type Props = {
    node: RepositoryNode | SearchRepositoryNode;
}


export const UnStar: FC<Props> = ({node}) => {

    const {id} = node;
    const [removeStar] = useMutation<StarRepoType>(UNSTAR_REPOSITORY);

    const handleClick = useCallback(() => {
        removeStar({variables: {id}}).then(value => console.log(value));
    }, [removeStar, id])

    return (
        <FavoriteIcon color="secondary"
              onClick={handleClick}>
            favorite
        </FavoriteIcon>
    );
};

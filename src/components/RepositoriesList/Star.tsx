import React, { FC, useCallback } from 'react';
import { STAR_REPOSITORY } from '../qraphql/STAR_REPOSITORY/STAR_REPOSITORY';
import { RepositoryNode } from '../qraphql/GET_LOGIN/types';
import { useMutation } from '@apollo/client';
import { StarRepoType } from '../qraphql/STAR_REPOSITORY/types';
import { SearchRepositoryNode } from '../qraphql/SEARCH_REPO/types';
import FavoriteIcon from '@material-ui/icons/Favorite';

type Props = {
    node: RepositoryNode | SearchRepositoryNode;
}

export const Star: FC<Props> = ({node}) => {
    const {id} = node;

    const [star] = useMutation<StarRepoType>(STAR_REPOSITORY);

    const handleClick = useCallback(() => {
        star({variables: {id}}).then(value => console.log(value));
    }, [star, id])

    return (
        <FavoriteIcon color="action"
              onClick={handleClick}>
            favorite
        </FavoriteIcon>
    );
};

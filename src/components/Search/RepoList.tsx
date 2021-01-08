import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import { Star, UnStar } from '../RepositoriesList';
import { RepositorySearchNode } from '../qraphql/SEARCH_REPO/types';


export const useStyles = makeStyles({
    card: {
        width: 610,
        height: 170,
        margin: 15,
        float: 'left',
        borderRadius: '4px',
        background: '#fff',
        boxShadow: '0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05)',
        cursor: 'pointer',
        transition: '.3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12)'
    },

    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

type Props = {
    data: RepositorySearchNode[];
}

export const RepoList: FC<Props> = ({data}) => {
    const classes = useStyles();
    return <ul style={{display: 'flex', flexWrap: 'wrap', listStyle: 'none'}}>
        {data.map(({node}) =>
            <li key={node.id}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h4">
                        <Link to={`/repository/${node.owner.login}/${node.name}`}>
                            {node.name}
                        </Link>
                        </Typography>
                        <Typography component="p">
                            Owner: {node.owner.login}
                        </Typography>
                        <Typography>
                            Updated: {node.updatedAt}
                        </Typography>
                        <Typography>
                            Url: <a href={node.url} target="_blank" rel="noreferrer">{node.url}</a>
                        </Typography>
                        <Button>
                            {node.viewerHasStarred ? (<UnStar node={node}/>) : (<Star node={node}/>)}
                            {node.stargazers.totalCount}
                        </Button>
                    </CardContent>

                </Card>
            </li>)

        }
    </ul>
};

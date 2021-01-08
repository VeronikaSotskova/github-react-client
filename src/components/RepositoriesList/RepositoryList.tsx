import React, { FC } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { RepositoriesType } from '../qraphql/GET_LOGIN/types';
import { UnStar } from './UnStar';
import { Star } from './Star';


export const useStyles = makeStyles({
    card: {
        width: 410,
        height: 200,
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
    data: RepositoriesType[];
}

export const RepositoryList: FC<Props> = ({data}) => {
    const classes = useStyles();
    return <ul>
        {data.map(({node}) => {
            return (
                <div style={{
                    width: '1400px',
                    margin: '0 auto'
                }}>
                    <Card className={classes.card}>
                        <li key={node.id}>
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
                        </li>
                    </Card>
                </div>
            );
        })}
    </ul>
};

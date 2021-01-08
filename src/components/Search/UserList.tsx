import React, { FC } from 'react';
import {CardContent} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom';
import Avatar from "@material-ui/core/Avatar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import SearchIcon from '@material-ui/icons/Search';
import { SearchUserNode } from '../qraphql/SEARCH_USER/types';

const useStyles = makeStyles({
    card: {
        width: 200,
        height: 250,
        margin: 15,
        float:'left',
        borderRadius: '4px',
        background: '#fff',
        boxShadow:'0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05)',
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
    data: SearchUserNode[];
}

export const UserList: FC<Props> = ({data}) => {
    const classes = useStyles();
    if (!data) return <h2>We couldn’t find <SearchIcon /></h2>;
    return <ul>
        {data.map(({node}) => {
            return (
                <div style={{
                    width: 1300,
                    display: 'block',
                    margin: '0 auto'
                }}>
                <Card className={classes.card}>
                    <li key={node.id}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    <Link  to={`/user/${node.id}`}
                                    style={{
                                        textDecoration: 'none'
                                    }}
                                    >{node.login}</Link>
                                    <Avatar src={node.avatarUrl}
                                            variant="rounded"
                                            style={{
                                               display: 'block',
                                                margin: '0 auto',
                                                width: 150,
                                                height: 150
                                            }}/>
                                </Typography>
                                <Typography color="textSecondary" component="p">
                                    {node.bio ? node.bio : 'No bio :('}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </li>
                </Card>
                </div>
            );
        })}
    </ul>
};

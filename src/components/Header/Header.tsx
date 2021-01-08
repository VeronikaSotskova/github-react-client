import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import { useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { client } from '../../api/Client';
import { Url } from '../../util';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    name: {
        color: 'red',
        textAlign: 'center'
    }
}));

export const ButtonAppBar: FC = () => {
    const history = useHistory();
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const [isTokenValid, setValid] = useState<boolean>(true);
    const [isLoggedIn, setLogin] = useState<boolean>(localStorage.getItem('token') !== null);

    const handleInput = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    }, []);

    const handleClickOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const redirect = useCallback((to: string) => {
        history.push(to);
    }, [history]);


    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const handleSubmit = () => {
        localStorage.setItem('token', value);
        setValue('');
        client
            .query({
                query: gql`
          {
            viewer {
              login
            }
          }
        `
            })
            .then(() => {
                setValid(true);
                setLogin(true);
                redirect('/');
                handleClose();
            })
            .catch((e) => {
                setValid(false);
            });
    };
    const classes = useStyles();

    const exit = () => {
        localStorage.clear();
        setLogin(false);
        redirect(Url.MAIN);
        client.resetStore();
    };
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar
                    style={{
                        background: '#2088ff'
                    }}
                >
                    <Typography variant="h6" className={classes.title}>
                        <Button color="inherit" onClick={() => redirect(Url.MAIN)}>
                            Github Client
                        </Button>
                    </Typography>
                    {isLoggedIn ? (
                        <React.Fragment>
                            <Button
                                color="inherit"
                                onClick={() => redirect(Url.SEARCH_REPOSITORY)}
                            >
                                Search Repository
                            </Button>
                            <Button color="inherit" onClick={() => redirect(Url.SEARCH_USER)}>
                                Search User
                            </Button>
                            <Button color="inherit" onClick={() => redirect(Url.PROFILE)}>
                                Profile
                            </Button>
                            <Button color="inherit" onClick={exit}>
                                Exit
                            </Button>
                        </React.Fragment>
                    ) : (
                        <Button color="inherit" onClick={handleClickOpen}>
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>

            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Login</DialogTitle>
                    <DialogContent style={{width: 500}}>
                        <TextField
                            value={value}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Enter token"
                            type="text"
                            fullWidth
                            onChange={handleInput}
                        />
                    </DialogContent>
                    {!isTokenValid && <div className={classes.name}>Invalid token</div>}
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

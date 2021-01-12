import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LoopIcon from '@material-ui/icons/Loop';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import EventNoteIcon from '@material-ui/icons/EventNote';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useStyles from '../../config/theme.dashboard';

function Sidebar(props) {
    let match = useRouteMatch();

    const classes = useStyles();

    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !props.open && classes.drawerPaperClose),
            }}
            open={props.open}
            >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={props.handleDrawerClose}>
                <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                <ListSubheader inset>Menu</ListSubheader>
                <Link to={`${match.url}`}>
                    <ListItem button>
                        <Link to='/dashboard'>
                          <ListItemIcon>
                              <EventNoteIcon />
                          </ListItemIcon>
                        </Link>
                        <Link to='/dashboard'>
                            <ListItemText primary="Dashboard" />
                        </Link>
                    </ListItem>
                    <ListItem button>
                      <Link to='/routines'>
                          <ListItemIcon>
                              <LoopIcon />
                          </ListItemIcon>
                        </Link>
                        <Link to='/routines'>
                            <ListItemText primary="Routines" />
                        </Link>
                    </ListItem>
                </Link>
            </List>
            <Divider />
            <List>
                <div>
                    <ListSubheader inset>Account</ListSubheader>
                    <Link to={`${match.url}/settings`}>
                        <ListItem button>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItem>
                    </Link>
                    <ListItem button onClick={() => props.signOut()}>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Log out" />
                    </ListItem>
                </div>
            </List>
        </Drawer>
    );
}

export default Sidebar;
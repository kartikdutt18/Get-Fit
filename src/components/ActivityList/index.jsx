import React from 'react';
import { withFirebase } from  '../Firebase';
import loader from './loader.gif';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MediaCard from'../MediaCard'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 3,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function ActivityList(props) {
    const {loading, activities, editActivity,setOpenSnackbar, setSnackbarMsg, setEditing} = props;

    const deleteActivity = (i) => {
        // Get key of activity in firebase
       const activityKey = Object.keys(activities)[i];
       // Connect to our firebase API
       const emptyActivity = {
            date: null,
            duration: null,
            type: null,
            name: null,
       };

       props.firebase.updateActivity(props.authUser.uid, emptyActivity, activityKey);

       // Show notification
       setOpenSnackbar(true);
       setSnackbarMsg('Deleted activity');
       setTimeout(() => {
        setOpenSnackbar(false)
       }, 3000)

       // stop editing
       setEditing(false);
    }

    return (
        <>
            { 
                loading === true 
                    ? <img src={loader} alt={loader}></img> 
                    : ''
            }
            
            {
              activities === 'not set' || activities === null
                  ? <p>No activities added yet.</p>
                  :
                    (
                      <div className={useStyles.root}>
                      <React.Fragment>
                        <Grid container spacing={4}>
                        {
                            Object.values(activities).map((activity, i) => {
                              return (
                                <Grid item xs={12} sm={6} md = {4} key={i}>
                                  <MediaCard
                                      activity={activity}
                                      id={i}
                                      key={i}
                                      deleteActivity={deleteActivity}
                                      editActivity={editActivity}/>
                                </Grid>)})
                        }
                        </Grid>
                      </React.Fragment>
                    </div>)
            }
    </>)
};

export default withFirebase(ActivityList);
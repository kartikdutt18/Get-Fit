import React from 'react';
import { withFirebase } from '../Firebase';
import loader from '../ActivityList/loader.gif';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MediaCard from '../MediaCard'

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


function RoutinesList(props) {
  const { loading, routines, authUser, firebase, selectedDay, setOpenSnackbar, setSnackbarMsg} = props;
  
  const uid = authUser.uid;

  // Set query date for updating database
  selectedDay.year = new Date().getFullYear();
  let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;
  let month = selectedDay.month >= 9 ? (selectedDay.month + 1).toString() :('0'+(selectedDay.month + 1).toString());

  // 0 corresponds to Sunday and 1 corresponds to Monday and so on.
  let queryDay = new Date(`${selectedDay.year}-${month}-${selectedDay.day}`).getDay()


  const addToActivity = (activity) => {
    firebase.addActivity(uid, activity);
    // Show notification
    setOpenSnackbar(true);
    setSnackbarMsg('Added activity');
    setTimeout(() => {
      setOpenSnackbar(false)
    }, 3000)
  }

  const matchesCurrentDay = (routine) => {
    return routine.day === queryDay
  }

  return (
    <>
      {
        loading === true
          ? <img src={loader} alt={loader}></img>
          : ''
      }

      {
        routines === 'not set' || routines === null
          ? <p>No activities added yet.</p>
          :
          (
            <div className={useStyles.root}>
              <React.Fragment>
                <Grid container spacing={4}>
                  {
                   
                    Object.values(routines).filter(matchesCurrentDay).map((routine, i) => {
                      let activity = {
                        'date': queryDate,
                        'duration': routine['duration'],
                        'name': routine['name'],
                        'type': routine['type']}
                      return (
                        <Grid item xs={12} sm={6} md={4} key={i}>
                          <MediaCard
                            activity={activity}
                            id={i}
                            key={i}
                            deleteActivity={null}
                            editActivity={null}
                            addToActivity={addToActivity}/>
                        </Grid>)
                    })
                  }
                </Grid>
              </React.Fragment>

            </div>)
      }
    </>)
};

export default withFirebase(RoutinesList);
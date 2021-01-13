import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';


import { makeStyles } from '@material-ui/core/styles';
import AddRoutine from '../AddRoutine';
import MediaCard from '../MediaCard'
import './routine-calendar.css'

import loader from '../ActivityList/loader.gif';

function RoutineCalendar(props) {

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

  const { firebase, authUser } = props;


  /*** ADDING AN ACTIVITY ***/
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState(null);

  /*** ACTIVITY LIST ***/
  const [loading, setLoading] = useState([]);
  const [routines, setRoutines] = useState(true);


  const retrieveData = () => {
    let ref = firebase.db.ref().child(`users/${authUser.uid}/routines`);
    ref.orderByChild("date").on("value", snapshot => {
      let data = snapshot.val();
      setRoutines(data);
      setLoading(false);
      // setEditing(false); Add later
    });
  };

  const deleteActivity = (i) => {
    // Get key of activity in firebase
    const activityKey = Object.keys(routines)[i];
    console.log(activityKey)
    // Connect to our firebase API
    const emptyActivity = {
      day: null,
      duration: null,
      type: null,
      name: null
    };

    props.firebase.updateRoutine(props.authUser.uid, emptyActivity, activityKey);

    // Show notification
    setOpenSnackbar(true);
    setSnackbarMsg('Deleted activity');
    setTimeout(() => {
      setOpenSnackbar(false)
    }, 3000)

    // stop editing
    setEditing(false);
  }

  const getDay = (day) =>
  {
    let displayType = ""
    switch (day) {
      case 0:
        displayType = "Sunday";
        break;
      case 1:
        displayType = "Monday";
        break;
      case 2:
        displayType = "Tuesday";
        break;
      case 3:
        displayType = "Wednesday";
        break;
      case 4:
        displayType = "Thursday"
        break;
      case 5:
        displayType = "Friday"
        break;
      case 6:
        displayType = "Saturday"
        break;
      default:
        displayType = "Not set";
    };

    return displayType
  }

  useEffect(() => retrieveData(), []);

  /*** EDIT AN ACTIVITY ***/
  const [editing, setEditing] = useState(false);


  return (
    <Grid container spacing={3} className="grid-main">

      <Grid item xs={12} md={4} lg={4}>
        <Paper className="paper">
          {
            loading === true
              ? <img src={loader} alt={loader}></img>
              : ''
          }
          {editing
            ?
            <>
            </>
            :
            <>
              <h3>Add Routine Workout </h3>
              <AddRoutine
                authUser={props.authUser}
                setOpenSnackbar={setOpenSnackbar}
                setSnackbarMsg={setSnackbarMsg}
              />
            </>
          }
        </Paper>
      </Grid>

      <Grid item xs={12} md={6} lg={7}>
        <Paper className="paper">
          {
            routines === null ? (<p>No Routine Found!</p>) : (

              [0, 1, 2, 3, 4, 5, 6].map((day, j) => {
                return (
                  <div>
                    <h3>Targets on {getDay(day)}</h3>
                    <Paper className="paper">
                      <div className={useStyles.root}>
                      <Grid container spacing={2}>
                        {
                          Object.values(routines).filter((routine) => routine.day == day).map((routine, i) => {
                            return (
                              <Grid item xs={12} sm={6} md={4} key={i}>
                                <MediaCard
                                  activity={routine}
                                  id={i}
                                  key={i}
                                  deleteActivity={deleteActivity}
                                  editActivity={null}
                                  addToActivity={null} />
                              </Grid>)
                          })
                        }
                      </Grid>
                      </div>
                    </Paper>
                  </div>)
              }))
          }
        </Paper>
      </Grid>


      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={openSnackbar}
        message={snackbarMsg}
      />
    </Grid>
  )
};

export default RoutineCalendar;
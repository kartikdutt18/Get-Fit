import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  root: {
    maxWidth: 220,
    margin: 5
    
  },
  media: {
    height: 100,
    width: '100%',
    objectFit: 'cover'
  },
});

function DisplayType(type)
{
  let displayType = ""
  switch (type) {
    case 1:
      displayType = "Lifting weights";
      break;
    case 2:
      displayType = "Running";
      break;
    case 3:
      displayType = "Cycling";
      break;
    case 4:
      displayType = "Free weights"
      break;
    default:
      displayType = "Not set";
  };

  return displayType
}

export default function MediaCard(props) {
  const classes = useStyles();
  const {deleteActivity, id, editActivity, activity} = props
  let {name, type, duration} = activity
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://source.unsplash.com/random/?workout"
          title="Workout"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {DisplayType(type)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <b>Duration : </b>{duration}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <EditIcon onClick={e => editActivity(activity, id)}/>
        <DeleteIcon onClick={e => deleteActivity(id)}/>
      </CardActions>
    </Card>
  );
}
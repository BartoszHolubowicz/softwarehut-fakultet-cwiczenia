import React from 'react';
import NavPanel from '../../components/navPanel/NavPanel'
import movieService from '../../services/movies.service';
import {IMovieResponse, IMoviesProps} from '../../services/movies.service';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme: any) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 900,
    },
  }),
);

const Movie = () => {
  const classes = useStyles();

  const { id } = useParams<{id: string}>();
  const [movieInfo, setMovieInfo] = React.useState<IMovieResponse | null>(null);

  React.useEffect(() => {
    movieService.searchById(id).then((resp) => {
      if (resp)
        setMovieInfo(resp);
      console.log(resp);
    });
  }, []);
  
  return (
    <div>
      <NavPanel />
      {movieInfo !== null &&
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <img src={movieInfo.Poster} />
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    {movieInfo.Title}, {movieInfo.Year}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {movieInfo.Genre}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {movieInfo.Plot}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      }
    </div>
    );
  };
  
  export default Movie;
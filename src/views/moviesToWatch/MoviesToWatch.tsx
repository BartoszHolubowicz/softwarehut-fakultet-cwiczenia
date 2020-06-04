import React, { useState } from 'react';
import NavPanel from '../../components/navPanel/NavPanel'
import movieService from '../../services/movies.service';
import {IMovieResponse, IWatchlistMovie, IMoviesProps} from '../../services/movies.service';
import { useSelector } from 'react-redux';
import { useService } from '../../hooks/useService';
import { TodoService } from '../../services/todo.service';
import { todosSelector } from '../../store/selectors/todos.selectors';
import { asyncForEach } from '../../services/utils';
import { ITodo } from '../../store/reducers/todos.reducer';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    marginTop: 10,
  },
});

const MoviesToWatch = () => {
  const classes = useStyles();

  const todoService = useService(TodoService);
  const todos = useSelector(todosSelector);

  const [movies, setMovies] = useState<IWatchlistMovie[]>([]);

  React.useEffect(() => {
    let todosAsMovies: IWatchlistMovie[] = [];
    
    asyncForEach(todos, async (todo: ITodo) => {
      await movieService.searchById(todo.id).then((resp) => {
        if (resp)
          todosAsMovies = [...todosAsMovies, { ...resp, watched: todo.done }];
      })
    })
    .then(() => setMovies(todosAsMovies))
    .then(() => console.log(todosAsMovies))
    .catch(console.error);
  }, []);

  return (
    <div>
      <NavPanel/>
      <Grid container spacing={1} direction="row" justify="space-evenly">
      {!!movies.length ? 
        movies.map((movie, key) =>
            <Card key={key} className={classes.card}>
              <CardActionArea component={Link} to={`/movie/${movie.imdbID}`}>
                <CardMedia
                  component="img"
                  height="300"
                  image={movie.Poster}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {movie.Title}
                  </Typography>
                  {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
                  <Typography variant="body2" color="textSecondary" component="p">
                    👀{movie.watched ? '✅' : '❌'}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ) :
        <h1>No movies in the watchlist</h1>}
      </Grid>
    </div>
  );
}

export default MoviesToWatch;
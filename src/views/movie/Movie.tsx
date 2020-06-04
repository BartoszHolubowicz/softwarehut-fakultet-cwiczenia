import React from 'react';
import NavPanel from '../../components/navPanel/NavPanel'
import movieService from '../../services/movies.service';
import {IMovieResponse, IMoviesProps} from '../../services/movies.service';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisiblityOffIcon from "@material-ui/icons/VisibilityOff";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import { makeStyles, createStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useService } from '../../hooks/useService';
import { TodoService } from '../../services/todo.service';
import { useSelector } from 'react-redux';
import { todosSelector } from '../../store/selectors/todos.selectors';
import { ITodosListStoreState, ITodo } from '../../store/reducers/todos.reducer';

const useStyles = makeStyles((theme: any) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 900,
    },
  }),
);

const handleMovieWatchlist = (todos: ITodo[], todoService: TodoService, movieId: string) => {
  const movieToWatch = todos.find(todo => todo.id === movieId);

  if (movieToWatch) {
    todoService.toggleTodoCompletion(movieToWatch);
    console.log('toggling movie watch state');
  }
  else {
    todoService.setNewTodo({
      id: movieId,
      done: false,
      label: 'new movie to watch',
      description: 'i have to watch this movie',
    });
    console.log('added a new movie to the watchlist');
  }
};

const handleMovieRemoveFromWatchlist = (todos: ITodo[], todoService: TodoService, movieId: string) => {
  const movieToRemove = todos.find(todo => todo.id === movieId);

  if (movieToRemove)
    todoService.deleteTodo(movieToRemove);
}

const Movie = () => {
  const classes = useStyles();

  const { id } = useParams<{id: string}>();
  const [movieInfo, setMovieInfo] = React.useState<IMovieResponse | null>(null);

  const todoService = useService(TodoService);
  const todos = useSelector(todosSelector);

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
                  {!!todos.find(todo => todo.id === id) &&
                    <IconButton onClick={() => handleMovieRemoveFromWatchlist(todos, todoService, id)}>
                      <PlaylistAddCheckIcon/>
                    </IconButton>
                  }
                  <IconButton onClick={() => handleMovieWatchlist(todos, todoService, id)}>
                    {!!todos.find(todo => todo.id === id) ? 
                      (!!todos.find(todo => todo.id === id)?.done ? <VisiblityOffIcon/> : <VisibilityIcon/>) :
                      <PlaylistAddIcon/>
                    }
                  </IconButton>
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
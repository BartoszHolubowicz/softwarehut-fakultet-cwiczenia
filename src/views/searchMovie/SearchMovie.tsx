import React from 'react';
import NavPanel from '../../components/navPanel/NavPanel'
import movieService, { IMoviesProps } from '../../services/movies.service';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import useDebounce from './useDebounce';


const useStyles = makeStyles({
  table: {
    display: 'inline-block',
    padding: '0 100px',
    textAlign: 'center',
  },
  card: {
    width: '350px',
    margin: '20px 0',
  },
  cardContent: {
    display: 'flex',
    flexFlow: 'column wrap',
    alignContent: 'center',
  },
  p: {
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '0',
  },
  input: {
    padding: '5px',
    border: '1px solid light-gray',
    borderRadius: '3px',
    width: '350px',
    marginTop: '20px',
    textAlign: 'center',
  },
  inputWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  searching: {
    display: 'flex',
    fontSize: '24px',
    fontWeight: 'normal',
    width: '100%',
    marginTop: '10px',
    justifyContent: 'center',
  },
  movieList: {
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: 'center',
  }
});

const handleCardClick = (history: any, movieId: any) => {
  console.log(movieId);
  history.push(`/movie/${movieId}`);
};

const SearchMovie = (props: any) => {
  const classes = useStyles();
  const [movies, setMovies] = React.useState<IMoviesProps | null>(null);
  const [movieToSearch, setMovieToSearch] = React.useState('');
  const [isSearching, setIsSearching] = React.useState(false);

  const debouncedSearchTerm = useDebounce(movieToSearch, 500);

  React.useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);

      movieService.searchByName(movieToSearch).then(resp => {
        setIsSearching(false);
        
        if (resp) {
          setMovies(resp);
        }
      });
    }
    else {
      setMovies(null);
    }

    movieService.searchById('tt0848228');
  }, [debouncedSearchTerm]);


  return (
    <div>
      <NavPanel/>
        <div className={classes.inputWrapper}>
          <input
            className={classes.input}
            placeholder="Enter movie name"
            onChange={event => setMovieToSearch(event.target.value)}
          />
        </div>
        { isSearching &&
          <div className={classes.searching}>
            Searching for movies...
          </div>
        }
        <div className={classes.movieList}>
          {!!movies?.movies.length &&
            movies?.movies.map(movie => (
              <Card className={classes.card} variant="outlined" onClick={() => handleCardClick(props.history, movie.id)}>
                <CardContent className={classes.cardContent}>
                  <p className={classes.p}>{movie.title}</p>
                  <p className={classes.p}>{movie.year}</p>
                  <img src={movie.poster} alt={movie.title}/>
                </CardContent>
              </Card>
            ))
          }
        </div>
    </div>
  );
};

export default SearchMovie;

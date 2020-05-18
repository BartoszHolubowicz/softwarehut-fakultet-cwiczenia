import http, { URL } from './utils';

const API = {
  SEARCH_BY_NAME: (name: string) => `${URL}&s=${name}`,
  SEARCH_BY_ID: (id: string) => `${URL}&i=${id}`,
};


/*
Poster: "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
Title: "The Avengers"
Type: "movie"
Year: "2012"
imdbID: "tt0848228"


Error: "Movie not found!"
Response: "False"




Actors: "Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth"
Awards: "Nominated for 1 Oscar. Another 38 wins & 79 nominations."
BoxOffice: "$623,279,547"
Country: "USA"
DVD: "25 Sep 2012"
Director: "Joss Whedon"
Genre: "Action, Adventure, Sci-Fi"
Language: "English, Russian, Hindi"
Metascore: "69"
Plot: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity."
Poster: "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
Production: "Walt Disney Pictures"
Rated: "PG-13"
Ratings -> Source: "Internet Movie Database" Value: "8.0/10"
Released: "04 May 2012"
Response: "True"
Runtime: "143 min"
Title: "The Avengers"
Type: "movie"
Website: "N/A"
Writer: "Joss Whedon (screenplay), Zak Penn (story), Joss Whedon (story)"
Year: "2012"
imdbID: "tt0848228"
imdbRating: "8.0"
imdbVotes: "1,225,316"
* */

interface IMovieSearchResponseMovie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

interface IMovieResposeProps {
  Error?: string;
  Response: string;
}

interface IMovieSearchResponse extends IMovieResposeProps {
  totalResults: string;
  Search: IMovieSearchResponseMovie[];
}

interface IMovieBasicProps {
  poster: string;
  title: string;
  type: string;
  year: string;
  id: string;
}

export interface IMoviesProps {
  movies: IMovieBasicProps[];
  totalResults: number;
}


interface IMovieResponseRating {
  Source: string;
  Value: string;
}

export interface IMovieResponse extends IMovieResposeProps {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: IMovieResponseRating[];
  Released: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}

interface IMovieProps {
  production: string;
  plot: string;
  title: string;
  ageRating: string;
  releaseDate: string;
  writer: string;
  director: string;
  actors: string;
  awards: string;
  rating: string;
  votes: string;
  poster: string;
}


const movieService = {
  searchByName: async (name: string) => {
    try {
      const searchResult: IMovieSearchResponse = await http.get(API.SEARCH_BY_NAME(name));
      if (searchResult?.Error) {
        console.log(searchResult.Error);
        return null;
      } else {
        const result: IMoviesProps = {
          totalResults: parseInt(searchResult.totalResults, 10),
          movies: searchResult.Search.map((movie) => ({
            id: movie.imdbID,
            poster: movie.Poster,
            title: movie.Title,
            type: movie.Type,
            year: movie.Year
          })),
        };
        return result;
      }
    } catch (e) {
      console.log(e);
    }

  },
  searchById: async (id: string) => {
    try {
      const resultById: IMovieResponse = await http.get(API.SEARCH_BY_ID(id));
      if (resultById?.Error) {
        console.log(resultById.Error);
        return null;
      } else {
        const result: IMovieResponse = resultById;
        return result;
      }
    } catch (e) {
      console.log(e);
    }
  },

};

export default movieService;

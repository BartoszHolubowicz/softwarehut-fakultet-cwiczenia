import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Movie from './views/movie/Movie';
import SearchMovie from './views/searchMovie/SearchMovie';
import Home from './views/home/Home';

//yarn add @types/react-router-dom  @types/react-router


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/movie/:id" component={Movie} />
          <Route path="/search" component={SearchMovie} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;





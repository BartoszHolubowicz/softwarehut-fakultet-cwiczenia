import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Movie from './views/movie/Movie';
import SearchMovie from './views/searchMovie/SearchMovie';
import Home from './views/home/Home';
import TodoPanel from './views/todoPanel/TodoPanel';
import { Provider } from 'react-redux';
import store from './store';

//yarn add @types/react-router-dom  @types/react-router


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <Switch>
            <Route path="/movie/:id" component={Movie}/>
            <Route path="/search" component={SearchMovie}/>
            <Route path="/todo" component={TodoPanel}/>
            <Route path="/" component={Home}/>
          </Switch>
        </Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;





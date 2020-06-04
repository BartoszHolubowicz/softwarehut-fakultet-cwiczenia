import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Movie from './views/movie/Movie';
import SearchMovie from './views/searchMovie/SearchMovie';
import Home from './views/home/Home';
import TodoPanel from './views/todoPanel/TodoPanel';
import { Provider } from 'react-redux';
import store from './store';
import MoviesToWatch from './views/moviesToWatch/MoviesToWatch';
import { useService } from './hooks/useService';
import { TodoService } from './services/todo.service';

//yarn add @types/react-router-dom  @types/react-router


const App = () => {
  const todoService = useService(TodoService);

  React.useEffect(() => {
    todoService.deleteTodo({
      id: '-1',
      description: '',
      done: false,
      label: ''
    });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <Switch>
            <Route path="/movie/:id" component={Movie}/>
            <Route path="/watchlist" component={MoviesToWatch}/>
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





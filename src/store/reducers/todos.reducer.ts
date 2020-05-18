import { Reducer } from 'redux';
import { Actions, TodoStoreActions } from '../actions/todos.actions';

export interface ITodo {
  id: number;
  label: string;
  done: boolean;
  description: string;
}

export interface ITodosListStoreState {
  list: ITodo[];
}

export const todosListInitialState: ITodosListStoreState = {
  list: [
    {
      id: -1,
      description: '',
      done: false,
      label: ''
    }
  ],
};


export const todosStoreReducer: Reducer<ITodosListStoreState, Actions> = (state: ITodosListStoreState = todosListInitialState, actions: Actions) => {
  switch (actions.type) {
    case TodoStoreActions.SET_NEW_TODO :
      return {
        ...state,
        list: [...state.list, actions.payload.todo]
      };
    case TodoStoreActions.SET_DELETE_TODO:
      return {
        ...state,
        list: state.list.filter(el => el.id !== actions.payload.todo.id)
      };
    case TodoStoreActions.SET_TODO_DONE:
      const todoFound = state.list.find(el => el.id === actions.payload.id);
      if (todoFound) {
        todoFound.done = true;
        return {
          ...state,
          list: [...state.list.filter(el => el.id !== actions.payload.id), todoFound],
        };
      }
      return state;
    default:
      return state;
  }
};

import { combineReducers } from 'redux';

import { ITodosListStoreState, todosListInitialState, todosStoreReducer } from './reducers/todos.reducer';
import * as TodosActions from './actions/todos.actions';


export type StoreActions = TodosActions.Actions;

export interface IStoreState {
  todos: ITodosListStoreState;
}

export const initialStoreState: IStoreState = {
  todos: todosListInitialState,
};

export const reducers = combineReducers<IStoreState>({
  todos: todosStoreReducer
});

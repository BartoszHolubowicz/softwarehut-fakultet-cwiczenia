import { IStoreState } from '../../store/store';
import { createSelector } from 'reselect';

export const todosSelector = createSelector(
  (state: IStoreState) => state.todos,
  todos => todos.list
);

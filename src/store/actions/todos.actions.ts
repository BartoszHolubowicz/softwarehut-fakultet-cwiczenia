import { ITodo } from '../reducers/todos.reducer';

export enum TodoStoreActions {
  SET_TODO_DONE = 'SET_TODO_DONE',
  SET_NEW_TODO = 'SET_NEW_TODO',
  SET_DELETE_TODO = 'SET_DELETE_TODO',
}


export interface ISetTodoDone {
  type: TodoStoreActions.SET_TODO_DONE,
  payload: {
    id: number,
  }
}

export interface ISetNewTodo {
  type: TodoStoreActions.SET_NEW_TODO,
  payload: {
    todo: ITodo
  }
}

export interface ISetDeleteTodo {
  type: TodoStoreActions.SET_DELETE_TODO,
  payload: {
    todo: ITodo
  }
}

export const todosActions = {
  setNewTodo: (todo: ITodo) => ({
    type: TodoStoreActions.SET_NEW_TODO,
    payload: {
      todo
    }
  }),
  setTodoDone: (id: number) => ({
    type: TodoStoreActions.SET_TODO_DONE,
    payload: {
      id
    }
  }),
  setDeleteTodo: (todo: ITodo) => ({
    type: TodoStoreActions.SET_DELETE_TODO,
    payload: {
      todo
    }
  })
};


export type Actions = ISetTodoDone & ISetNewTodo & ISetDeleteTodo;

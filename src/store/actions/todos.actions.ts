import { ITodo } from '../reducers/todos.reducer';

export enum TodoStoreActions {
  SET_TODO_DONE = 'SET_TODO_DONE',
  SET_TODO_UNDONE = 'SET_TODO_UNDONE',
  TOGGLE_TODO_COMPLETION = 'TOGGLE_TODO_COMPLETION',
  SET_NEW_TODO = 'SET_NEW_TODO',
  SET_DELETE_TODO = 'SET_DELETE_TODO',
}


export interface ISetTodoDone {
  type: TodoStoreActions.SET_TODO_DONE,
  payload: {
    id: string,
  }
}

export interface IToggleTodoCompletion {
  type: TodoStoreActions.TOGGLE_TODO_COMPLETION,
  payload: {
    id: string,
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
  setTodoDone: (id: string) => ({
    type: TodoStoreActions.SET_TODO_DONE,
    payload: {
      id
    }
  }),
  toggleTodoCompletion: (id: string) => ({
    type: TodoStoreActions.TOGGLE_TODO_COMPLETION,
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


export type Actions = ISetTodoDone & ISetNewTodo & IToggleTodoCompletion & ISetDeleteTodo;

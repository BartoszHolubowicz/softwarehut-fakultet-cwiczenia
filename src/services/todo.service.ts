import { ITodo } from '../store/reducers/todos.reducer';
import store from '../store';
import { todosActions } from '../store/actions/todos.actions';

export class TodoService {

  setNewTodo(todo: ITodo) {
   store.dispatch(todosActions.setNewTodo(todo));
  }

  deleteTodo(todo: ITodo) {
    store.dispatch(todosActions.setDeleteTodo(todo));
  }

  setTodoDone(todo: ITodo) {
    store.dispatch(todosActions.setTodoDone(todo.id));
  }

}

import ItemTodo from './ItemTodo';
import { List } from 'antd';
import type { Todo, Filter } from '../types/todo';
import { memo } from 'react';

interface TodoListProps {
  todos: Todo[];
  loadTodos: (filter?: Filter) => Promise<void>;
  setError: (message: string) => void;
}
const TodoList = memo(({ todos = [], loadTodos, setError }: TodoListProps) => {
  return (
    <List>
      {todos.map((todo) => (
        <ItemTodo
          key={todo.id}
          todo={todo}
          loadTodos={loadTodos}
          setError={setError}
        />
      ))}{' '}
    </List>
  );
});
export default TodoList;

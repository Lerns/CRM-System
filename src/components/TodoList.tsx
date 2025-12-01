import ItemTodo from './ItemTodo';

import { List } from 'antd';

import type { Todo, Filter } from '../helpers/types';

interface TodoListProps {
  todos: Todo[];
  loadTodos: (filter?: Filter) => Promise<void>;
  setError: (message: string) => void;
}

export default function TodoList({
  todos = [],
  loadTodos,
  setError,
}: TodoListProps) {
  return (
    <List>
      {todos.map((todo) => (
        <ItemTodo
          key={todo.id}
          todo={todo}
          loadTodos={loadTodos}
          setError={setError}
        />
      ))}
    </List>
  );
}

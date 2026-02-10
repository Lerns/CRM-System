import ItemTodo from './ItemTodo';

import { List } from 'antd';

import type { Todo, Filter } from '../types/typesTodo';

interface TodoListProps {
  todos: Todo[];
  loadTodos: (filter?: Filter) => Promise<void>;
  onError: (message: string) => void;
}

export default function TodoList({ todos, loadTodos, onError }: TodoListProps) {
  return (
    <List
      dataSource={todos}
      renderItem={(todo) => (
        <ItemTodo
          key={todo.id}
          todo={todo}
          loadTodos={loadTodos}
          onError={onError}
        />
      )}
    />
  );
}

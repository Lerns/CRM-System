import ItemTodo from './ItemTodo';
import { List, Typography } from 'antd';
import type { Todo, Filter } from '../types/todo';

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  loadTodos: (filter?: Filter) => Promise<void>;
  setError: (message: string) => void;
}
export default function TodoList({
  todos,
  loading,
  loadTodos,
  setError,
}: TodoListProps) {
  return (
    <List>
      {loading ? (
        <Typography.Text>Идет загрузка, ожидайте</Typography.Text>
      ) : (
        todos.map((todo) => (
          <ItemTodo
            key={todo.id}
            todo={todo}
            loadTodos={loadTodos}
            setError={setError}
          />
        ))
      )}
    </List>
  );
}

import ItemTodo from './ItemTodo.js';
import './TodoList.scss';
import type { Todo, Filter } from '../types/todo.js';

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
    <ul className="task">
      {loading ? (
        <li>Идет загрузка, ожидайте</li>
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
    </ul>
  );
}

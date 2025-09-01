import ItemTodo from './ItemTodo';
import './TodoList.scss';

export default function TodoList({ todos, loading, loadTodos, setError }) {
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

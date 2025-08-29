import ItemTodo from './ItemTodo';
import './TodoList.scss';
export default function TodoList({ todos, loading, loadTodos, setError }) {
  return (
    <ul className="task">
      {loading ? (
        <h3>Идет загрузка, ожидайте</h3>
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

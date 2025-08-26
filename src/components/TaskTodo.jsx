import TodoItem from './ItemTodo';
import './TaskTodo.scss';
export default function TaskTodo({
  todos,
  loading,
  fetchTodos,
  fetchStatus,
  setError,
  setSuccess,
}) {
  return (
    <form className="task">
      {loading ? (
        <li>
          <h3>Идет загрузка, ожидайте</h3>
        </li>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            fetchTodos={fetchTodos}
            fetchStatus={fetchStatus}
            setError={setError}
            setSuccess={setSuccess}
          />
        ))
      )}
    </form>
  );
}

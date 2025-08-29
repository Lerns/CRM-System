import { useState, useEffect, useRef } from 'react';
import Status from '../../components/Status.jsx';
import { fetchTodo, statsTodo } from '../../API/http.js';
import TitleTodo from '../../components/TitleTodo.jsx';
import TodoList from '../../components/TodoList.jsx';
import './TodoListPage.scss';
import Error from '../../components/Error.jsx';
export default function TodoListPage() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ all: 0, completed: 0, inWork: 0 });
  const filterRef = useRef('all');

  const loadTodos = async (filter = filterRef.current) => {
    try {
      setLoading(true);
      const res = await fetchTodo(filter);
      setTodos(res.data);
      filterRef.current = filter;
      const data = await statsTodo();
      setStatus(data);
      setError('');
    } catch (error) {
      setError(error.message || 'Ошибка');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <>
      <TitleTodo loadTodos={loadTodos} setError={setError} />
      <Status loadTodos={loadTodos} status={status} />
      {error && (
        <Error title="Ошибка" message={error} onClose={() => setError('')} />
      )}
      <TodoList
        todos={todos}
        loading={loading}
        loadTodos={loadTodos}
        setError={setError}
      />
    </>
  );
}

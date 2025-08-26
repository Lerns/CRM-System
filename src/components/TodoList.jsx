import { useState, useEffect, useRef } from 'react';
import Status from './Status.jsx';
import { fetchTodo, statsTodo } from '../API/http.js';
import Add from './AddTodo.jsx';
import TaskTodo from './TaskTodo.jsx';
import './TodoList.scss';
import Error from './Error.jsx';
export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({});
  const filterRef = useRef('all');

  const fetchTodos = async (filter = filterRef.current) => {
    setLoading(true);
    try {
      const res = await fetchTodo(filter);
      setTodos(res.data);
      filterRef.current = filter;
      setLoading(false);
      setError('');
    } catch (error) {
      setError(error.message || 'Ошибка');
    }
  };

  const fetchStatus = async () => {
    try {
      const data = await statsTodo();
      setStatus(data);
      setError('');
    } catch (error) {
      setError(error.message || 'Ошибка');
    }
  };
  useEffect(() => {
    fetchTodos();
    fetchStatus();
  }, []);

  return (
    <>
      {error && (
        <Error title="Ошибка" message={error} onClose={() => setError('')} />
      )}
      {success && <div>{success}</div>}
      <Add
        fetchTodos={fetchTodos}
        fetchStatus={fetchStatus}
        setError={setError}
      />
      <Status onFilter={fetchTodos} status={status} />
      <TaskTodo
        todos={todos}
        loading={loading}
        fetchTodos={fetchTodos}
        fetchStatus={fetchStatus}
        setError={setError}
        setSuccess={setSuccess}
      />
    </>
  );
}

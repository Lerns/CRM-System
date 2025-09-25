import { useState, useEffect, useRef } from 'react';

import TitleTodo from '../../components/TitleTodo.js';
import Status from '../../components/Status.js';
import TodoList from '../../components/TodoList.js';
import Error from '../../components/Error.js';

import { fetchTodo, statsTodo } from '../../API/http.js';
import type { Stats, Filter, Todo } from '../../types/todo.ts';
import { errorMessage } from '../../helpers/errorMessage.js';
import './TodoListPage.scss';

export default function TodoListPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<Stats>({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  const filterRef = useRef<Filter>('all');

  const loadTodos = async (filter: Filter = filterRef.current) => {
    try {
      setLoading(true);
      const res = await fetchTodo(filter);
      setTodos(res.data);
      filterRef.current = filter;
      const data = await statsTodo();
      setStatus(data);
      setError('');
    } catch (err: unknown) {
      setError(errorMessage(err));
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
      <Status
        loadTodos={loadTodos}
        status={status}
        filterColor={filterRef.current}
      />
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

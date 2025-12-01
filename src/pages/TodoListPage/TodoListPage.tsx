import { useState, useEffect, useCallback } from 'react';

import TitleTodo from '../../components/TitleTodo';
import Status from '../../components/Status';
import TodoList from '../../components/TodoList';
import Error from '../../components/Error';

import { fetchTodo } from '../../API/http';
import type { Stats, Filter, Todo } from '../../helpers/types';
import { errorMessage } from '../../helpers/errorMessage';
import { AUTO_REFRESH_DELAY } from '../../helpers/constants';

export default function TodoListPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string>('');
  const [filter, setFilter] = useState<Filter>('all');
  const [status, setStatus] = useState<Stats>({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  const loadTodos = useCallback(async () => {
    try {
      const res = await fetchTodo(filter);
      setTodos(res.data);
      const data = res.info ?? { all: 0, completed: 0, inWork: 0 };
      setStatus(data);
      setError('');
    } catch (err: unknown) {
      setError(errorMessage(err));
    }
  }, [filter]);

  useEffect(() => {
    loadTodos();
    const interval = setInterval(() => {
      loadTodos();
    }, AUTO_REFRESH_DELAY);
    return () => clearInterval(interval);
  }, [loadTodos]);

  return (
    <>
      <TitleTodo loadTodos={loadTodos} setError={setError} />
      <Status filter={filter} setFilter={setFilter} status={status} />
      {error && (
        <Error title="Ошибка" message={error} onClose={() => setError('')} />
      )}
      <TodoList todos={todos} loadTodos={loadTodos} setError={setError} />
    </>
  );
}

import { useState, useEffect, useCallback } from 'react';

import TitleTodo from '../../components/TitleTodo';
import Status from '../../components/Status';
import TodoList from '../../components/TodoList';
import Error from '../../components/Error';

import { fetchTodo } from '../../API/http';
import type { Stats, Filter, Todo } from '../../types/todo';
import { errorMessage } from '../../helpers/errorMessage';

export default function TodoListPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState<Stats>({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  const loadTodos = useCallback(async (filter: Filter = 'all') => {
    try {
      setLoading(true);
      const res = await fetchTodo(filter);
      setTodos((prev) => {
        return JSON.stringify(prev) === JSON.stringify(res.data)
          ? prev
          : res.data;
      });
      setStatus((prev) => {
        return JSON.stringify(prev) === JSON.stringify(res.info!)
          ? prev
          : res.info!;
      });
      setError('');
    } catch (err: unknown) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodos();
    const interval = setInterval(() => {
      if (!isEditing) {
        loadTodos();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [loadTodos, isEditing]);

  return (
    <>
      <TitleTodo loadTodos={loadTodos} setError={setError} />
      <Status loadTodos={loadTodos} status={status} />
      {error && (
        <Error title="Ошибка" message={error} onClose={() => setError('')} />
      )}
      <TodoList
        setIsEditing={setIsEditing}
        todos={todos}
        loading={loading}
        loadTodos={loadTodos}
        setError={setError}
      />
    </>
  );
}

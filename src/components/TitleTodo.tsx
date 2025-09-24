import { useState } from 'react';

import './TitleTodo.scss';
import { createTodo } from '../API/http.js';
import { validateTodoTitle } from '../helpers/validation.js';
import { errorMessage } from '../helpers/errorMessage.js';
import type { Filter } from '../types/todo.js';

interface titleTodoProps {
  loadTodos: (filter?: Filter) => Promise<void>;
  setError: (message: string) => void;
}
export default function TitleTodo({ loadTodos, setError }: titleTodoProps) {
  const [title, setTitle] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = validateTodoTitle(title);
    if (validationError) {
      return setError(validationError);
    }
    try {
      await createTodo({ title });
      setTitle('');
      loadTodos();
      setError('');
    } catch (err: unknown) {
      setError(errorMessage(err) || 'Ошибка');
    }
  };

  return (
    <form className="add" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Task To Be Done..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

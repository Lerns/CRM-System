import { useState } from 'react';
import './TitleTodo.scss';
import { createTodo } from '../API/http';
import { validateTodoTitle } from '../helpers/validation';
export default function TitleTodo({ loadTodos, setError }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateTodoTitle(title);
    if (validationError) {
      return setError(validationError);
    }
    try {
      await createTodo(title);
      setTitle('');
      loadTodos();
      setError('');
    } catch (err) {
      setError(err.message || 'Ошибка');
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

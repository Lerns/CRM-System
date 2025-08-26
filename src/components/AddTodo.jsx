import { useState } from 'react';
import './AddTodo.scss';
import { createTodo } from '../API/http';

export default function Add({ fetchTodos, fetchStatus, setError }) {
  const [create, setCreate] = useState('');

  const validate = (value) => {
    if (!value.trim()) return 'Это поле не может быть пустым';
    if (value.trim().length < 2) return 'Минимальная длина текста 2 символа';
    if (value.trim().length > 64) return 'Максимальная длина текста 64 символа';
    return '';
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate(create);
    if (validationError) {
      return setError(validationError);
    }
    try {
      await createTodo(create);
      setCreate('');
      fetchTodos();
      fetchStatus();
      setError('');
    } catch (err) {
      setError(err.message || 'Ошибка');
    }
  };
  return (
    <>
      <form className="add">
        <input
          type="text"
          name="title"
          placeholder="Task To Be Done..."
          value={create}
          onChange={(e) => setCreate(e.target.value)}
        />
        <button onClick={handleSubmit}>Add</button>
      </form>
    </>
  );
}

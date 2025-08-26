import { useState } from 'react';
import { putTodo, deleteTodo } from '../API/http';
import './ItemTodo.scss';
import iconEdit from '../assets/editing.png';
import inconDel from '../assets/trash.png';
export default function ItemTodo({
  todo,
  fetchTodos,
  fetchStatus,
  setError,
  setSuccess,
}) {
  const [todoEditID, setTodoEditID] = useState(null);
  const [editText, setEditText] = useState('');

  const validate = (value) => {
    if (!value.trim()) return 'Это поле не может быть пустым';
    if (value.trim().length < 2) return 'Минимальная длина текста 2 символа';
    if (value.trim().length > 64) return 'Максимальная длина текста 64 символа';
    return '';
  };
  const togleCompleted = async (todo) => {
    try {
      await putTodo(todo.id, { isDone: !todo.isDone });
      await fetchTodos();
      await fetchStatus();
    } catch (err) {
      setError(err.message || 'Ошибка при изменении статуса');
    }
  };
  const handleSave = async (todo) => {
    const validationError = validate(editText);
    if (validationError) {
      return setError(validationError);
    }
    try {
      await putTodo(todo.id, { title: editText });
      setSuccess('Задача обновлена');
      setTodoEditID(null);
      setEditText('');
      fetchTodos();
      fetchStatus();
    } catch (err) {
      setError(err.message || 'Ошибка при обновлении задачи');
    }
  };

  const handleEdit = (todo) => {
    setTodoEditID(todo.id);
    setEditText(todo.title);
  };
  const handleCancel = () => {
    setTodoEditID(null);
    setEditText('');
  };
  const removeTodo = async (id) => {
    try {
      await deleteTodo(id);
      setSuccess('Задача удалена!');
      fetchTodos();
      fetchStatus();
    } catch (err) {
      setError(err.message || 'Ошибка при удалении задачи');
      setSuccess('');
    }
  };
  return (
    <ul>
      <li className="item">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={() => togleCompleted(todo)}
        />
        {todoEditID == todo.id ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        ) : (
          <span className={todo.isDone ? 'done' : ''}>{todo.title}</span>
        )}

        <div className="buttons">
          {todoEditID === todo.id ? (
            <>
              <button
                className="save"
                type="button"
                onClick={() => handleSave(todo)}
              >
                Сохранить
              </button>
              <button className="cancel" type="button" onClick={handleCancel}>
                Отмена
              </button>
            </>
          ) : (
            <>
              <button
                className="edit"
                type="button"
                onClick={() => {
                  if (todo.isDone === true) return;
                  else if (todo.isDone === false) handleEdit(todo);
                }}
              >
                <img src={iconEdit} alt="edit" />
              </button>
              <button
                className="del"
                type="button"
                onClick={() => removeTodo(todo.id)}
              >
                <img src={inconDel} alt="удалить" />
              </button>
            </>
          )}
        </div>
      </li>
    </ul>
  );
}

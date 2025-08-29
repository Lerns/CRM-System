import { useState } from 'react';
import { putTodo, deleteTodo } from '../API/http';
import './ItemTodo.scss';
import { validateTodoTitle } from '../helpers/validation';
import iconEdit from '../assets/editing.png';
import inconDel from '../assets/trash.png';
export default function ItemTodo({ todo, loadTodos, setError }) {
  const [editText, setEditText] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const handleSave = async () => {
    const validationError = validateTodoTitle(editText);
    if (validationError) {
      return setError(validationError);
    }
    try {
      await putTodo(todo.id, { title: editText });
      setIsEdit(false);
      setEditText('');
      loadTodos();
    } catch (err) {
      setError(err.message || 'Ошибка при обновлении задачи');
    }
  };

  const toggleCompleted = async () => {
    try {
      await putTodo(todo.id, { isDone: !todo.isDone });
      await loadTodos();
    } catch (err) {
      setError(err.message || 'Ошибка при изменении статуса');
    }
  };

  const handleEdit = () => {
    setIsEdit(true);
    setEditText(todo.title);
  };

  const handleCancel = () => {
    setIsEdit(false);
    setEditText('');
  };

  const removeTodo = async (id) => {
    try {
      await deleteTodo(id);
      loadTodos();
    } catch (err) {
      setError(err.message || 'Ошибка при удалении задачи');
    }
  };

  return (
    <form>
      <li className="item">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={() => toggleCompleted()}
        />
        {isEdit ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        ) : (
          <span className={todo.isDone ? 'done' : ''}>{todo.title}</span>
        )}

        <div className="buttons">
          {isEdit ? (
            <>
              <button
                className="save"
                type="button"
                onClick={() => handleSave()}
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
                  handleEdit();
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
    </form>
  );
}

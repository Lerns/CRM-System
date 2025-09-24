import { useState } from 'react';

import { putTodo, deleteTodo } from '../API/http.js';
import { validateTodoTitle } from '../helpers/validation.js';
import { errorMessage } from '../helpers/errorMessage.js';
import type { Todo, Filter } from '../types/todo.js';
import './ItemTodo.scss';
import iconEdit from '../assets/editing.png';
import inconDel from '../assets/trash.png';
interface ItemTodoProps {
  todo: Todo;
  loadTodos: (filter?: Filter) => Promise<void>;
  setError: (message: string) => void;
}
export default function ItemTodo({ todo, loadTodos, setError }: ItemTodoProps) {
  const [editText, setEditText] = useState<string>('');
  const [editState, setEditState] = useState<boolean>(false);

  const handleSave = async () => {
    const validationError = validateTodoTitle(editText);
    if (validationError) {
      return setError(validationError);
    }
    try {
      await putTodo(todo.id, { title: editText });
      setEditState(false);
      setEditText('');
      loadTodos();
    } catch (err: unknown) {
      setError(errorMessage(err) || 'Ошибка при обновлении задачи');
    }
  };

  const toggleCompleted = async () => {
    try {
      await putTodo(todo.id, { isDone: !todo.isDone });
      await loadTodos();
    } catch (err) {
      setError(errorMessage(err) || 'Ошибка при изменении статуса');
    }
  };

  const handleEdit = () => {
    setEditState(true);
    setEditText(todo.title);
  };

  const handleCancel = () => {
    setEditState(false);
    setEditText('');
  };

  const removeTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      loadTodos();
    } catch (err) {
      setError(errorMessage(err) || 'Ошибка при удалении задачи');
    }
  };

  return (
    <form>
      <li className="item">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={toggleCompleted}
        />

        {editState ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        ) : (
          <span className={todo.isDone ? 'done' : ''}>{todo.title}</span>
        )}

        <div className="buttons">
          {editState ? (
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

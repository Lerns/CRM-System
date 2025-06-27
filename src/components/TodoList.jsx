import { useState, useEffect } from 'react';
import Status from './Status.jsx';
import iconEdit from '../assets/editing.png';
import inconDel from '../assets/trash.png';
import { fetchTodo, createTodo, deleteTodo, putTodo } from '../API/http.js';
import Error from './Error.jsx';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [create, setCreate] = useState(''); //создание задачи
  const [error, setError] = useState(''); // ошибка
  const [success, setSuccess] = useState(''); // успех
  const [loading, setLoading] = useState(false); // загрузка
  const [todoEditID, setTodoEditID] = useState(null); //обновление задачи
  const [editText, setEditText] = useState('');
  const [filtered, setFiltered] = useState([]);

  function todoFilter(status) {
    if (status === 'all') {
      setFiltered(todos);
    } else if (status === 'inWork') {
      let newTodo = todos.filter((item) => item.isDone === false);
      setFiltered(newTodo);
    } else if (status === 'completed') {
      let newTodo = todos.filter((item) => item.isDone === true);
      setFiltered(newTodo);
    }
  }
  useEffect(() => {
    fetchTodos();
  }, []);

  // Загрузка списка задач
  const fetchTodos = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await fetchTodo();
      setTodos(res.data);
      setFiltered(res.data);
      setLoading(false);
    } catch (error) {
      setError(error.message || 'Не удалось загрузить');
    }
  };

  // Валидация ввода
  const validate = (value) => {
    if (!value.trim()) return 'Введите название задачи';
    if (value.trim().length < 2) return 'Минимум 2 символа';
    if (value.trim().length > 64) return 'Максимум 64 символа';
    return '';
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate(create);
    if (validationError) {
      setError(validationError);
      setSuccess('');
      return;
    }
    /* const addTodo = (create) => {
      setSuccess((prev) => [{ todos }, ...prev]);
    }; */
    try {
      {
        const addTodo = await createTodo(create);
        setSuccess('Задача создана!');
        //  неуспешная попытка вывода новой задачи сверху списка
        setTodos((prev) => [addTodo.data, ...todos, ...prev]);
        setCreate('');
      }
      fetchTodos(); // обновили список задач
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };
  //удаление задачи
  const removeTodo = async (id) => {
    try {
      await deleteTodo(id);
      setSuccess('Задача удалена!');
      fetchTodos();
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };
  //обновление задачи
  const handleSave = async (todo) => {
    const validationError = validate(editText);
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      await putTodo(todo.id, { title: editText });
      setSuccess('Задача обновлена');
      setTodoEditID(null);
      setEditText('');
      fetchTodos();
    } catch (err) {
      setError(err.message);
      setSuccess('');
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
  const togleCompleted = async (todo) => {
    try {
      await putTodo(todo.id, { isDone: !todo.isDone });
      fetchTodos();
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <form className="form">
        <input
          type="text"
          name="title"
          placeholder="Task To Be Done..."
          value={create}
          onChange={(e) => setCreate(e.target.value)}
        />
        <button onClick={handleSubmit}>Add</button>
      </form>

      {error && <Error title="Ошибка" message={error} />}
      {success && <p>{success}</p>}
      <Status todos={todos} onFilter={todoFilter} />
      <form className="task">
        {loading ? (
          <h1>Идет загрузка, ожидайте</h1>
        ) : (
          filtered.map((todo) => (
            <li key={todo.id} className="todo-item">
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
                    <button type="button" onClick={() => handleSave(todo)}>
                      Сохранить
                    </button>
                    <button type="button" onClick={handleCancel}>
                      Отмена
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (todo.isDone === true) return;
                      else if (todo.isDone === false) handleEdit(todo);
                    }}
                  >
                    <img src={iconEdit} alt="edit" />
                  </button>
                )}
                <button type="button" onClick={() => removeTodo(todo.id)}>
                  <img src={inconDel} alt="удалить" />
                </button>
              </div>
            </li>
          ))
        )}
      </form>
    </>
  );
}

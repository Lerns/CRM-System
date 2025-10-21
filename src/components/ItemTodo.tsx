import { useState } from 'react';

import { putTodo, deleteTodo } from '../API/http';
import { validateTodoTitle } from '../helpers/validation';
import { errorMessage } from '../helpers/errorMessage';
import type { Todo, Filter } from '../types/todo';
import { Button, Input, Space, Card, Checkbox, Typography } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
} from '@ant-design/icons';

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
    <Card>
      <Checkbox checked={todo.isDone} onChange={toggleCompleted} />

      {editState ? (
        <Input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        <Typography.Text>{todo.title}</Typography.Text>
      )}

      <Space>
        {editState ? (
          <>
            <Button
              type="primary"
              size="small"
              icon={<SaveOutlined />}
              onClick={() => handleSave()}
            >
              Сохранить
            </Button>
            <Button
              type="primary"
              danger
              icon={<CloseOutlined />}
              size="small"
              onClick={handleCancel}
            >
              Отмена
            </Button>
          </>
        ) : (
          <>
            <Button
              type="primary"
              icon={<EditOutlined />}
              size="small"
              onClick={() => {
                handleEdit();
              }}
            ></Button>
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => removeTodo(todo.id)}
            ></Button>
          </>
        )}
      </Space>
    </Card>
  );
}

import { useState, memo } from 'react';

import { putTodo, deleteTodo } from '../API/http';
import { errorMessage } from '../helpers/errorMessage';
import type { Todo, Filter } from '../types/todo';
import { Button, Input, Flex, Card, Checkbox, Typography, Form } from 'antd';
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
const ItemTodo = memo(({ todo, loadTodos, setError }: ItemTodoProps) => {
  const [editText, setEditText] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

  const handleSave = async (values: { title: string }) => {
    const title = values.title.trim();
    try {
      await putTodo(todo.id, { title });
      setEditText(false);
      await loadTodos();
      setError('');
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
    setEditText(true);
    setTitle(todo.title);
  };

  const handleCancel = () => {
    setEditText(false);
    setTitle('');
  };

  const removeTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      await loadTodos();
    } catch (err) {
      setError(errorMessage(err) || 'Ошибка при удалении задачи');
    }
  };

  return (
    <Card>
      <Flex align="center" justify="space-between" gap="small">
        <Flex align="center" gap="small" flex={1}>
          <Checkbox onChange={toggleCompleted} />

          {editText ? (
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          ) : (
            <Typography.Text>{todo.title}</Typography.Text>
          )}
        </Flex>
        <Flex align="center" gap="small">
          {editText ? (
            <>
              <Button
                type="primary"
                size="small"
                icon={<SaveOutlined />}
                onClick={() => handleSave({ title })}
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
                onClick={handleEdit}
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
        </Flex>
      </Flex>
    </Card>
  );
});
export default ItemTodo;

import { useState, memo } from 'react';

import { putTodo, deleteTodo } from '../API/http';
import { errorMessage } from '../helpers/errorMessage';
import { titleRules } from '../helpers/validation';

import type { Todo, Filter } from '../helpers/types';

import { Button, Input, Card, Checkbox, Typography, Form, Flex } from 'antd';

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
  const [form] = Form.useForm();

  const handleTodoSave = async (values: { title: string }) => {
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

  const handleTodoEditStart = () => {
    form.setFieldsValue({ title: todo.title });
    setEditText(true);
  };

  const handleTodoEditCancel = () => {
    setEditText(false);
    form.resetFields();
  };

  const handleTodoDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      await loadTodos();
    } catch (err) {
      setError(errorMessage(err) || 'Ошибка при удалении задачи');
    }
  };

  const handleTodoToggle = async () => {
    try {
      await putTodo(todo.id, { isDone: !todo.isDone });
      await loadTodos();
      setError('');
    } catch (err) {
      setError(errorMessage(err) || 'Ошибка при изменении статуса');
    }
  };

  return (
    <Card>
      <Flex align="center" justify="space-between">
        <Flex align="center" gap="small" flex={1}>
          <Checkbox checked={todo.isDone} onChange={handleTodoToggle} />

          {editText ? (
            <>
              <Form form={form} onFinish={handleTodoSave} layout="inline">
                <Form.Item name="title" rules={titleRules}>
                  <Input />
                </Form.Item>

                <Button
                  type="primary"
                  size="small"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                >
                  Сохранить
                </Button>

                <Button
                  type="primary"
                  danger
                  size="small"
                  icon={<CloseOutlined />}
                  onClick={handleTodoEditCancel}
                >
                  Отмена
                </Button>
              </Form>
            </>
          ) : (
            <>
              <Typography.Text>{todo.title}</Typography.Text>

              <Button
                type="primary"
                icon={<EditOutlined />}
                size="small"
                htmlType="button"
                onClick={handleTodoEditStart}
              />

              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                size="small"
                onClick={() => handleTodoDelete(todo.id)}
              />
            </>
          )}
        </Flex>
      </Flex>
    </Card>
  );
});

export default ItemTodo;

import { useState, memo } from 'react';

import { putTodo, deleteTodo } from '../api/http';
import { errorMessage } from '../helpers/errorMessage';
import { titleRules } from '../helpers/validation';

import type { Todo, Filter } from '../types/types';

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
  onError: (message: string) => void;
}

const ItemTodo = memo(({ todo, loadTodos, onError }: ItemTodoProps) => {
  const [editText, setEditText] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleTodoSave = async (values: { title: string }) => {
    const title = values.title.trim();
    try {
      await putTodo(todo.id, { title });
      setEditText(false);
      await loadTodos();
      onError('');
    } catch (err: unknown) {
      onError(errorMessage(err) || 'Ошибка при обновлении задачи');
    }
  };

  const handleTodoEditStart = () => {
    setEditText(true);
  };

  const handleTodoEditCancel = () => {
    setEditText(false);
    form.resetFields();
  };

  const handleTodoDelete = async () => {
    try {
      await deleteTodo(todo.id);
      await loadTodos();
    } catch (err: unknown) {
      onError(errorMessage(err) || 'Ошибка при удалении задачи');
    }
  };

  const handleTodoToggle = async () => {
    try {
      await putTodo(todo.id, { isDone: !todo.isDone });
      await loadTodos();
      onError('');
    } catch (err: unknown) {
      onError(errorMessage(err) || 'Ошибка при изменении статуса');
    }
  };

  return (
    <Card>
      <Flex align="center" justify="space-between">
        <Flex align="center" gap="small" flex={1}>
          <Checkbox checked={todo.isDone} onChange={handleTodoToggle} />

          {editText ? (
            <>
              <Form
                initialValues={{ title: todo.title }}
                form={form}
                onFinish={handleTodoSave}
                layout="inline"
              >
                <Form.Item name="title" rules={titleRules}>
                  <Input />
                </Form.Item>

                <Button
                  type="primary"
                  size="small"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                />

                <Button
                  type="primary"
                  color="danger"
                  variant="solid"
                  size="small"
                  icon={<CloseOutlined />}
                  onClick={handleTodoEditCancel}
                />
              </Form>
            </>
          ) : (
            <>
              <Typography.Text>{todo.title}</Typography.Text>

              <Button
                type="primary"
                icon={<EditOutlined />}
                size="small"
                onClick={handleTodoEditStart}
              />

              <Button
                type="primary"
                color="danger"
                variant="solid"
                icon={<DeleteOutlined />}
                size="small"
                onClick={handleTodoDelete}
              />
            </>
          )}
        </Flex>
      </Flex>
    </Card>
  );
});

export default ItemTodo;

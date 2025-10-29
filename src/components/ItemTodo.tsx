import { useState } from 'react';

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

export default function ItemTodo({ todo, loadTodos, setError }: ItemTodoProps) {
  const [editText, setEditText] = useState<boolean>(false);
  const [form] = Form.useForm();

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
    form.setFieldsValue({ title: todo.title });
  };

  const handleCancel = () => {
    setEditText(false);
    form.resetFields();
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
    <Form
      form={form}
      initialValues={{ checkbox: todo.isDone, title: todo.title }}
      onFinish={handleSave}
    >
      <Card>
        <Flex align="center" justify="space-between" gap="small">
          <Flex align="center" gap="small" flex={1}>
            <Form.Item name="checkbox" valuePropName="checked">
              <Checkbox onChange={toggleCompleted} />
            </Form.Item>
            {editText ? (
              <Form.Item
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Это поле не может быть пустым ',
                    transform: (value: string) => value.trim(),
                  },
                  {
                    min: 2,
                    message: 'Минимальная длина текста 2 символа',
                    transform: (value: string) => value.trim(),
                  },
                  {
                    max: 64,
                    message: 'Максимальная длина текста 64 символа',
                    transform: (value: string) => value.trim(),
                  },
                ]}
              >
                <Input autoFocus={editText} autoComplete="off" />
              </Form.Item>
            ) : (
              <Typography.Text>{todo.title}</Typography.Text>
            )}
          </Flex>
          <Flex align="center" gap="small">
            {editText ? (
              <>
                <Form.Item>
                  <Button
                    type="primary"
                    size="small"
                    icon={<SaveOutlined />}
                    htmlType="submit"
                  >
                    Сохранить
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    danger
                    icon={<CloseOutlined />}
                    size="small"
                    onClick={handleCancel}
                  >
                    Отмена
                  </Button>
                </Form.Item>
              </>
            ) : (
              <>
                <Form.Item>
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    size="small"
                    onClick={() => {
                      handleEdit();
                    }}
                  ></Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    size="small"
                    onClick={() => removeTodo(todo.id)}
                  ></Button>
                </Form.Item>
              </>
            )}
          </Flex>
        </Flex>
      </Card>
    </Form>
  );
}

import React, { useState, memo } from 'react';

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
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}
const ItemTodo = memo(
  ({ todo, loadTodos, setIsEditing, setError }: ItemTodoProps) => {
    const [editText, setEditText] = useState<boolean>(false);
    const [form] = Form.useForm();

    const handleSave = async (values: { title: string }) => {
      const title = values.title.trim();
      try {
        await putTodo(todo.id, { title });
        setIsEditing(false);
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
        setError('');
      } catch (err) {
        setError(errorMessage(err) || 'Ошибка при изменении статуса');
      }
    };

    const handleEdit = () => {
      setIsEditing(true);
      setEditText(true);
      form.setFieldsValue({ title: todo.title });
    };

    const handleCancel = () => {
      setIsEditing(false);
      setEditText(false);
      form.resetFields();
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
            <Checkbox checked={todo.isDone} onChange={toggleCompleted} />

            {editText ? (
              <Form form={form} onFinish={handleSave}>
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
                  icon={<CloseOutlined />}
                  size="small"
                  onClick={handleCancel}
                >
                  Отмена
                </Button>
              </Form>
            ) : (
              <Typography.Text>{todo.title}</Typography.Text>
            )}
          </Flex>
          <Flex align="center" gap="small">
            {!editText && (
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
  },
);
export default ItemTodo;

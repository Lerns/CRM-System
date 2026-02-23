import { useState, memo } from 'react';

import { updateTodo, deleteTodo } from '../api/http';
import { getErrorMessage } from '../helpers/errorMessage';
import { titleRules } from '../helpers/validation';

import type { Todo, Filter } from '../types/typesTodo';

import { Button, Input, Checkbox, Typography, Form, Flex, List } from 'antd';
import { notification } from 'antd';

import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
} from '@ant-design/icons';

interface ItemTodoProps {
  todo: Todo;
  loadTodos: (filter?: Filter) => Promise<void>;
}

const ItemTodo = memo(({ todo, loadTodos }: ItemTodoProps) => {
  const [editText, setEditText] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleTodoSave = async (values: { title: string }) => {
    const title = values.title.trim();
    try {
      await updateTodo(todo.id, { title });
      setEditText(false);
      await loadTodos();
    } catch (err: unknown) {
      notification.error({
        message: 'Ошибка',
        description: getErrorMessage(err) || 'Ошибка при обновлении задачи',
      });
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
      notification.error({
        message: 'Ошибка',
        description: getErrorMessage(err) || 'Ошибка при удалении задачи',
      });
    }
  };

  const handleTodoToggle = async () => {
    try {
      await updateTodo(todo.id, { isDone: !todo.isDone });
      await loadTodos();
    } catch (err: unknown) {
      notification.error({
        message: 'Ошибка',
        description:
          getErrorMessage(err) || 'Ошибка при обновлении статуса задачи',
      });
    }
  };

  return (
    <List.Item>
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

                <Form.Item>
                  <Button
                    type="primary"
                    size="small"
                    htmlType="submit"
                    icon={<SaveOutlined />}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    color="danger"
                    variant="solid"
                    size="small"
                    icon={<CloseOutlined />}
                    onClick={handleTodoEditCancel}
                  />
                </Form.Item>
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
    </List.Item>
  );
});

export default ItemTodo;

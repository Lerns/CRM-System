import { useState } from 'react';

import { createTodo } from '../API/http';
import { errorMessage } from '../helpers/errorMessage';
import type { Filter } from '../types/todo';

import { Form, Input, Button } from 'antd';

interface titleTodoProps {
  loadTodos: (filter?: Filter) => Promise<void>;
  setError: (message: string) => void;
}

export default function TitleTodo({ loadTodos, setError }: titleTodoProps) {
  const [form] = Form.useForm();

  const handleSubmit = async (value: { title: string }) => {
    const title = value.title.trim();
    try {
      await createTodo(title);
      form.resetFields();
      loadTodos();
      setError('');
    } catch (err: unknown) {
      setError(errorMessage(err) || 'Ошибка');
    }
  };

  return (
    <Form
      autoComplete="off"
      layout="inline"
      form={form}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="input"
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
        <Input autoComplete="off" placeholder="Task To Be Done..." />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
}

import { memo } from 'react';

import { createTodo } from '../API/http';
import { errorMessage } from '../helpers/errorMessage';
import { titleRules } from '../helpers/validation';

import { Form, Input, Button } from 'antd';

import type { Filter } from '../helpers/types';

interface TitleTodoProps {
  loadTodos: (filter?: Filter) => Promise<void>;
  setError: (message: string) => void;
}

const TitleTodo = memo(({ loadTodos, setError }: TitleTodoProps) => {
  const [form] = Form.useForm();

  const handleTodoCreate = async (value: { title: string }) => {
    const title = value.title.trim();
    try {
      await createTodo(title);
      form.resetFields();
      setError('');
      loadTodos();
    } catch (err: unknown) {
      setError(errorMessage(err) || 'Ошибка');
    }
  };

  return (
    <Form
      autoComplete="off"
      layout="inline"
      form={form}
      name="todo"
      onFinish={handleTodoCreate}
    >
      <Form.Item validateTrigger="onSubmit" name="title" rules={titleRules}>
        <Input autoComplete="off" placeholder="Введите текст..." />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form.Item>
    </Form>
  );
});

export default TitleTodo;

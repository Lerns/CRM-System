import { memo } from 'react';

import { createTodo } from '../api/http';
import { getErrorMessage } from '../helpers/errorMessage';
import { titleRules } from '../helpers/validation';

import { Form, Input, Button } from 'antd';

import type { Filter, AddTodoFormValues } from '../types/typesTodo';

interface AddTodoProps {
  loadTodos: (filter?: Filter) => Promise<void>;
  onError: (message: string) => void;
}

const AddTodo = memo(({ loadTodos, onError }: AddTodoProps) => {
  const [form] = Form.useForm<{ title: string }>();

  const handleTodoCreate = async (value: AddTodoFormValues) => {
    const title = value.title.trim();

    try {
      await createTodo(title);
      form.resetFields();
      onError('');
      await loadTodos();
    } catch (err: unknown) {
      onError(getErrorMessage(err) || 'Ошибка');
    }
  };

  return (
    <Form<AddTodoFormValues>
      autoComplete="off"
      layout="inline"
      form={form}
      name="todo"
      onFinish={handleTodoCreate}
    >
      <Form.Item
        validateTrigger="onSubmit"
        name="title"
        rules={titleRules}
        normalize={(value) => value.trim()}
      >
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

export default AddTodo;

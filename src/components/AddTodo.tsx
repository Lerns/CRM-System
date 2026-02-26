import { memo } from 'react';

import { createTodo } from '../api/http';
import { getErrorMessage } from '../helpers/errorMessage';
import { titleRules } from '../helpers/validation';

import { Form, Input, Button, notification } from 'antd';

import type { Filter, AddTodoFormValues } from '../types/typesTodo';

interface AddTodoProps {
  loadTodos: (filter?: Filter) => Promise<void>;
}

const AddTodo = memo(({ loadTodos }: AddTodoProps) => {
  const [form] = Form.useForm<{ title: string }>();

  const handleTodoCreate = async (value: AddTodoFormValues) => {
    const title = value.title.trim();

    try {
      await createTodo(title);
      form.resetFields();
      await loadTodos();
    } catch (err: unknown) {
      notification.error({
        message: 'Ошибка',
        description: getErrorMessage(err) || 'Ошибка при создании задачи',
      });
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
        normalize={(value) => value.trimStart()}
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

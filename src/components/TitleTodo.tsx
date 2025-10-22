import { useState } from "react";

import { createTodo } from "../API/http";
import { errorMessage } from "../helpers/errorMessage";
import type { Filter } from "../types/todo";

import { Form, Input, Button, Space } from "antd";

interface titleTodoProps {
  loadTodos: (filter?: Filter) => Promise<void>;
  setError: (message: string) => void;
}

export default function TitleTodo({ loadTodos, setError }: titleTodoProps) {
  const [title, setTitle] = useState<string>("");

  const handleSubmit = async (value: { title: string }) => {
    try {
      await createTodo(value.title);
      setTitle("");
      loadTodos();
      setError("");
    } catch (err: unknown) {
      setError(errorMessage(err) || "Ошибка");
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="input"
        rules={[
          {
            required: true,
            message: "Это поле не может быть пустым ",
            transform: (value: string) => value.trim(),
          },
          {
            min: 2,
            message: "Минимальная длина текста 2 символа",
            transform: (value: string) => value.trim(),
          },
          {
            max: 64,
            message: "Максимальная длина текста 64 символа",
            transform: (value: string) => value.trim(),
          },
        ]}
      >
        <Space.Compact style={{ width: "100%" }}>
          <Input
            placeholder="Task To Be Done..."
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Space.Compact>
      </Form.Item>
    </Form>
  );
}

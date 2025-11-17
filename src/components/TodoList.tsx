import ItemTodo from './ItemTodo';
import { List, Typography } from 'antd';
import type { Todo, Filter } from '../types/todo';
import React from 'react';

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  loadTodos: (filter?: Filter) => Promise<void>;
  setError: (message: string) => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function TodoList({
  todos = [],
  loading,
  loadTodos,
  setError,
  setIsEditing,
}: TodoListProps) {
  if (loading)
    return <Typography.Text>Идет загрузка, ожидайте</Typography.Text>;
  if (todos.length === 0)
    return <Typography.Text>Нет задач для отображения</Typography.Text>;

  return (
    <List
      dataSource={todos}
      renderItem={(todo: Todo) => (
        <List.Item key={todo.id}>
          <ItemTodo
            setIsEditing={setIsEditing}
            todo={todo}
            loadTodos={loadTodos}
            setError={setError}
          />
        </List.Item>
      )}
    />
  );
}

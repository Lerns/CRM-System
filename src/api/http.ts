import { api } from './axios';
import type {
  Todo,
  TodoRequest,
  Stats,
  Filter,
  MetaResponse,
} from '../types/types';

export async function fetchTodo(
  filter: Filter = 'all',
): Promise<MetaResponse<Todo, Stats>> {
  const response = await api.get('/todos', {
    params: { filter },
  });
  return response.data;
}

export async function createTodo(title: string): Promise<Todo> {
  const { data } = await api.post<Todo>('/todos', { title });
  return data;
}

export async function putTodo(id: number, data: TodoRequest): Promise<Todo> {
  const response = await api.put(`/todos/${id}`, data);
  return response.data;
}

export async function deleteTodo(id: number): Promise<boolean> {
  await api.delete(`/todos/${id}`);
  return true;
}

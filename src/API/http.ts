import axios from 'axios';
import type {
  Todo,
  TodoRequest,
  Stats,
  Filter,
  MetaResponse,
} from '../types/todo.js';
const API = axios.create({
  baseURL: 'https://easydev.club/api/v1',
});

export async function fetchTodo(
  filter: Filter = 'all',
): Promise<MetaResponse<Todo, Stats>> {
  const response = await API.get(`/todos?filter=${filter}`);
  return response.data;
}

export async function statsTodo(): Promise<Stats> {
  const response = await API.get<MetaResponse<Todo, Stats>>(
    `/todos?filter=all`,
  );
  if (!response.data.info) {
    throw new Error('Нет данных о статусе');
  }
  return response.data.info;
}

export async function createTodo(title: string): Promise<Todo> {
  const { data } = await API.post<Todo>(`/todos`, { title });
  return data;
}

export async function putTodo(id: number, data: TodoRequest): Promise<Todo> {
  const response = await API.put(`/todos/${id}`, data);
  return response.data;
}

export async function deleteTodo(id: number): Promise<boolean> {
  await API.delete(`/todos/${id}`);
  return true;
}

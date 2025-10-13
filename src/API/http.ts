import type {
  Todo,
  TodoRequest,
  Stats,
  Filter,
  MetaResponse,
} from '../types/todo.js';
const API = 'https://easydev.club/api/v1';

export async function fetchTodo(
  filter: Filter = 'all',
): Promise<MetaResponse<Todo, Stats>> {
  const response = await fetch(`${API}/todos?filter=${filter}`);
  const resData: MetaResponse<Todo, Stats> = await response.json();
  if (!response.ok) {
    throw new Error('Не удалось загрузить');
  }
  return resData;
}

export async function statsTodo(): Promise<Stats> {
  const response = await fetch(`${API}/todos?filter=all`);
  const resData: MetaResponse<Todo, Stats> = await response.json();

  if (!response.ok) {
    throw new Error('Не удалось загрузить');
  }
  if (!resData.info) {
    throw new Error('Нет данных о статусе');
  }
  return resData.info;
}

export async function createTodo(title: string): Promise<Todo> {
  const response = await fetch(`${API}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ошибка при создании задачи');
  }
  const resData: Todo = await response.json();
  return resData;
}

export async function putTodo(id: number, data: TodoRequest): Promise<Todo> {
  const response = await fetch(`${API}/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ошибка при редактировании задачи');
  }
  const resData: Todo = await response.json();
  return resData;
}

export async function deleteTodo(id: number): Promise<boolean> {
  const response = await fetch(`${API}/todos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ошибка при удалении задачи');
  }
  return true;
}

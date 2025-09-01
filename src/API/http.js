const API = 'https://easydev.club/api/v1';
export async function fetchTodo(filter = 'all') {
  const response = await fetch(`${API}/todos?filter=${filter}`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Не удалось загрузить');
  }
  return resData;
}
export async function statsTodo() {
  const response = await fetch(`${API}/todos?filter=all`);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error('Не удалось загрузить');
  }
  return resData.info;
}

export async function createTodo(title) {
  const response = await fetch(`${API}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ошибка при создании задачи');
  }
  const resData = await response.json();
  return resData;
}

export async function putTodo(id, data) {
  const response = await fetch(`${API}/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ошибка при редактировании задачи');
  }
  const resData = await response.json();
  return resData;
}

export async function deleteTodo(id) {
  const response = await fetch(`${API}/todos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ошибка при удалении задачи');
  }
  return true;
}

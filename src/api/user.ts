import {
  User,
  UserFilters,
  MetaResponse,
  UserRequest,
  UserRolesRequest,
} from '../types/typesUsers';
import { api } from './axios';

export async function getUsers(
  filters: UserFilters = {},
): Promise<MetaResponse<User>> {
  const response = await api.get<MetaResponse<User>>('/admin/users', {
    params: filters,
  });
  return response.data;
}

export async function getUser(params: { id: number }): Promise<User> {
  const response = await api.get<User>(`/admin/users/${params.id}`);
  return response.data;
}

export async function updateUserRights(
  id: number,
  data: UserRolesRequest,
): Promise<User> {
  const response = await api.post<User>(`/admin/users/${id}/rights`, data);
  return response.data;
}

export async function updateUser(id: number, data: UserRequest): Promise<User> {
  const response = await api.put<User>(`/admin/users/${id}`, data);
  return response.data;
}

export async function blockUser(id: number): Promise<User> {
  const response = await api.post<User>(`/admin/users/${id}/block`);
  return response.data;
}

export async function unblockUser(id: number): Promise<User> {
  const response = await api.post<User>(`/admin/users/${id}/unblock`);
  return response.data;
}

export async function deleteUser(id: number): Promise<void> {
  await api.delete(`/admin/users/${id}`);
}

import { User, UserFilters, MetaResponse } from '../types/typesUsers';
import { api } from './axios';

export async function getUsers(
  filters: UserFilters = {},
): Promise<MetaResponse<User>> {
  const response = await api.get<MetaResponse<User>>('/admin/users', {
    params: filters,
  });
  return response.data;
}

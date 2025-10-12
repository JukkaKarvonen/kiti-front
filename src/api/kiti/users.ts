import { api } from 'boot/axios'
import type { paths } from './schema'

// 200 OK payload for GET /users/current/
type GetCurrentUserResponse =
  paths['/api/users/current/']['get']['responses']['200']['content']['application/json']

export async function getCurrentUser() {
  const { data } = await api.get<GetCurrentUserResponse>('users/current/')
  return data
}

export default {
  getCurrentUser,
}

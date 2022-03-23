import { api } from '../api'

export async function getLatest(): Promise<string> {
  const { data } = await api.get<string[]>('/api/versions.json')
  return data[0]
}

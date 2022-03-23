import { api } from '../api'

type props = {
  version: string
  locale: string
}

export async function getAll({ version, locale }: props) {
  const { data } = await api.get(`/cdn/${version}/data/${locale}/champion.json`)
  return data.data
}

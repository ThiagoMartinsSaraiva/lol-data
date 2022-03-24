import { api } from '../api'

interface GetAllProps {
  version: string
  locale: string
}

interface GetChampionProps {
  version: string
  locale: string
  championName: string
}

export async function getAll({ version, locale }: GetAllProps) {
  const { data } = await api.get(`/cdn/${version}/data/${locale}/champion.json`)
  return data.data
}

export async function getChampion({
  version,
  locale,
  championName,
}: GetChampionProps) {
  const { data } = await api.get(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/${locale}/champion/${championName}.json`,
  )
  return data.data
}

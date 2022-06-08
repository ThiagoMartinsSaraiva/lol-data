import { api } from '../api'

interface IProps {
  version: string
  locale: string
}

interface IGetChampionProps extends IProps {
  championName: string
}

export async function getAll({ version, locale }: IProps) {
  const { data } = await api.get(`/cdn/${version}/data/${locale}/champion.json`)
  return data.data
}

export async function getChampion({
  version,
  locale,
  championName,
}: IGetChampionProps) {
  const { data } = await api.get(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/${locale}/champion/${championName}.json`,
  )
  return data.data
}

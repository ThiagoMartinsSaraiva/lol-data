export interface ICurrentChampion {
  name: string
  id: string
  key: string
  title: string
  skins: ICurrentChampionSkins[]
  allytips: string[]
  enemytips: string[]
  tags: string[]
  partype: string
  info: ICurrentChampionStats
  passive: Omit<ICurrentChampionSpells, 'id' | 'cooldown' | 'cost'>
  spells: ICurrentChampionSpells[]
  image: {
    full: string
  }
}

export interface ICurrentChampionSkins {
  id: string
  num: number
  name: string
  chromas: boolean
}

export interface ICurrentChampionStats {
  attack: number
  defense: number
  magic: number
  difficulty: number
}

export interface ICurrentChampionSpells {
  id: string
  name: string
  description: string
  cooldown: number[]
  cost: number[]
  image: ICurrentChampionSpellImage
}

export interface ICurrentChampionSpellImage {
  full: string
  sprite: string
}

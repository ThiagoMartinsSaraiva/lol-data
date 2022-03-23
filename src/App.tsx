import { useEffect, useState } from 'react'
import './App.css'
import { useVersion } from './contexts/version'
import { getAll } from './services/champion'

interface Champion {
  name: string
  key: string
  title: string
  partype: string
  blurb: string
  image: ChampionImage
  info: ChampionInfo
  tags: string[]
}

interface ChampionImage {
  full: string
  sprite: string
  group: string
  x: number
  y: number
  w: number
  h: number
}

interface ChampionInfo {
  attack: number
  defense: number
  magic: number
  difficulty: number
}

interface ChampionKey {
  [champion: string]: Champion
}

function App() {
  const [champions, setChampions] = useState<ChampionKey>({} as ChampionKey)
  const { version } = useVersion()

  useEffect(() => {
    if (version) {
      getAll({ version, locale: 'pt_BR' }).then((data) => {
        console.log(data)
        setChampions(data)
      })
    }
  }, [version])

  return (
    <>
      <section className="champions-container">
        {Object.keys(champions).map((championKey) => (
          <div key={championKey} className="champion-card">
            <div className="image-container">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${champions[championKey].image.full}`}
                loading="lazy"
                style={{ display: 'block' }}
              />
            </div>
            <div className="champion-name">
              <p>{champions[championKey].name}</p>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}

export default App

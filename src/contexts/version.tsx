import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { getLatest } from '../services/versions'

interface IVersionContextData {
  version: string
}

interface IVersionProviderProps {
  children: ReactNode
}

const VersionContext = createContext<IVersionContextData>(
  {} as IVersionContextData,
)

export function VersionProvider({ children }: IVersionProviderProps) {
  const [version, setVersion] = useState('')

  useEffect(() => {
    const storagedVersion = localStorage.getItem('@LolData:version')

    if (storagedVersion) {
      setVersion(JSON.parse(storagedVersion))
    } else {
      getLatest().then((latestVersion) => {
        localStorage.setItem('@LolData:version', JSON.stringify(latestVersion))
        setVersion(latestVersion)
      })
    }
  }, [])

  return (
    <VersionContext.Provider value={{ version }}>
      {children}
    </VersionContext.Provider>
  )
}

export function useVersion(): IVersionContextData {
  const context = useContext(VersionContext)

  return context
}

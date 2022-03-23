import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { getLatest } from '../services/versions'

interface VersionContextData {
  version: string
}

interface VersionProviderProps {
  children: ReactNode
}

const VersionContext = createContext<VersionContextData>(
  {} as VersionContextData,
)

export function VersionProvider({ children }: VersionProviderProps) {
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
  })

  return (
    <VersionContext.Provider value={{ version }}>
      {children}
    </VersionContext.Provider>
  )
}

export function useVersion(): VersionContextData {
  const context = useContext(VersionContext)

  return context
}

import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

export interface IPandaflagContext {
  isLoading: boolean
  flags: IPandaFlag[]
}

export interface IPandaFlag {
  id: string
  name: string
  description: string
  enabled: boolean
}

const defaultState: IPandaflagContext = {
  isLoading: true,
  flags: [],
}

export const PandaflagContext = createContext<IPandaflagContext>(defaultState)

export interface IPandaflagProviderProps {
  apiKey: string
  environment: string
  children: ReactNode | JSX.Element
}

const PANDAFLAG_SOCKET_URL: string = 'ws://api.pandaflag.com/'

export function PandaflagProvider({ apiKey, environment, children }: IPandaflagProviderProps) {
  const [flags, setFlags] = useState<IPandaFlag[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const socket: Socket = io(PANDAFLAG_SOCKET_URL, { query: { apiKey, environment } })

    socket.on('connect', () => {
      socket.on('newFlags', (data: any) => {
        setFlags(data)
        setIsLoading(false)
      })
    })

    return () => {
      socket.disconnect()
    }
  }, [apiKey, environment])

  return <PandaflagContext.Provider value={{ flags, isLoading }}>{children}</PandaflagContext.Provider>
}

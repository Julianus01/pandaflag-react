import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

export interface PandaflagContextState {
  isLoading: boolean
  flags: Flag[]
}

export interface Flag {
  id: string
  name: string
  description: string
  enabled: boolean
}

const defaultState: PandaflagContextState = {
  isLoading: true,
  flags: [],
}

export const PandaflagContext = createContext<PandaflagContextState>(defaultState)

export interface PandaflagProviderProps {
  apiKey: string
  environment: string
  children: ReactNode | JSX.Element
}

const PANDAFLAG_SOCKET_URL: string = 'wss://api.pandaflag.com/'

export function PandaflagProvider({ apiKey, environment, children }: PandaflagProviderProps) {
  const [flags, setFlags] = useState<Flag[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const socket: Socket = io(PANDAFLAG_SOCKET_URL, { secure: true, query: { apiKey, environment } })

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

import { useContext } from 'react'
import { Flag, PandaflagContextState, PandaflagContext } from '../context/PandaflagContext'

export interface IUseFlag {
  isLoading: boolean
  flag: Flag
}

export function useFlag(flagName: string) {
  const pandaflagContext = useContext<PandaflagContextState>(PandaflagContext)

  if (!flagName) {
    throw new Error('Flag name unspecified')
  }

  const foundFlag = pandaflagContext.flags.find((flag: Flag) => flag.name === flagName)
  if (pandaflagContext.isLoading) {
    return { isLoading: true, flag: foundFlag }
  }

  if (!foundFlag) {
    return { isLoading: pandaflagContext.isLoading, flag: undefined }
  }

  return { isLoading: pandaflagContext.isLoading, flag: foundFlag }
}

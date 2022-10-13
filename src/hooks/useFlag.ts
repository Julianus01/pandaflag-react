import { useContext } from 'react'
import { IPandaFlag, IPandaflagContext, PandaflagContext } from '../context/PandaflagContext'

export interface IUseFlag {
  isLoading: boolean
  flag: IPandaFlag
}

export function useFlag(flagName: string) {
  const pandaflagContext = useContext<IPandaflagContext>(PandaflagContext)

  if (!flagName) {
    throw new Error('Flag name unspecified')
  }

  const foundFlag = pandaflagContext.flags.find((flag: IPandaFlag) => flag.name === flagName)
  if (pandaflagContext.isLoading) {
    return { isLoading: true, flag: foundFlag }
  }

  if (!foundFlag) {
    return { isLoading: pandaflagContext.isLoading, flag: undefined }
  }

  return { isLoading: pandaflagContext.isLoading, flag: foundFlag }
}

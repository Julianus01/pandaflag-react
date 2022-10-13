import { useContext } from 'react'
import { IPandaflagContext, PandaflagContext } from '../context/PandaflagContext'

export type IUseFlags = IPandaflagContext

export function useFlags(): IUseFlags {
  return useContext<IPandaflagContext>(PandaflagContext) as IUseFlags
}

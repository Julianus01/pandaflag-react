import { useContext } from 'react'
import { PandaflagContextState, PandaflagContext } from '../context/PandaflagContext'

export type IUseFlags = PandaflagContextState

export function useFlags(): IUseFlags {
  return useContext<PandaflagContextState>(PandaflagContext) as IUseFlags
}

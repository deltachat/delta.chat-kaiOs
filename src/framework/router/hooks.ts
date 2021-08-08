import { useContext, useEffect } from 'preact/hooks'
import { NavElementContext } from './navElement'
import { KeyBinding } from '../keymanager'
import type {h} from 'preact'

export function useKeyMap(
  keymap: KeyBinding[],
  update_triggers: unknown[] = [0]
) {
  const context = useContext(NavElementContext)
  if (!context) throw new Error('no context')
  useEffect(() => {
    context.setKeyMap(...keymap)
  }, update_triggers)
}

export function useScreenSetup(
  header: string | h.JSX.Element| undefined,
  transparent = false
) {
  const context = useContext(NavElementContext)
  if (!context) throw new Error('no context')
  useEffect(() => {
    context.setHeader(header)
    context.setTransparency(transparent)
  }, [header, transparent])
}

export function useScreen() {
  const context = useContext(NavElementContext)
  if (!context) throw new Error('no context')

  const { initData, nav } = context
  return { data: initData, nav }
}

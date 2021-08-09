import { useScreen, useKeyMap, useScreenSetup } from '../router'
import { KeyBinding, Key } from '../keymanager'
import { NavRemote } from '../router/navElement'

function AlertDialog() {
  const { nav, data } = useScreen()

  const resolve = () => {
    nav.closeCurrent()
    data.callback()
  }

  useKeyMap([
    new KeyBinding(Key.CSK, resolve, 'Ok'),
    new KeyBinding(Key.BACK_CLEAR, resolve),
  ])

  useScreenSetup(undefined, true)

  return (
    <div class='bf-dialog-popup'>
      <div class='dialog alert'>
        <div class='title'>{String(data.title)}</div>
        <div class='content'>{String(data.text)}</div>
      </div>
    </div>
  )
}

export async function showAlert(
  nav: NavRemote,
  title: string,
  text: string
): Promise<void> {
  return new Promise((resolve, _reject) => {
    nav.push(AlertDialog, { callback: resolve, title, text })
  })
}

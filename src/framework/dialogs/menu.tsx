import { useScreen, useKeyMap, useScreenSetup } from '../router'
import { KeyBinding, Key } from '../keymanager'
import { useRef, useEffect, useLayoutEffect, useState } from 'preact/hooks'
import { RefObject, h } from 'preact'
import { NavRemote } from '../router/navElement'
import { clamp } from '../util'

function Menu() {
  const { nav, data } = useScreen()

  const resolve = (result: number | null) => {
    nav.closeCurrent()
    data.callback(result)
  }

  const menuOptions: RefObject<HTMLDivElement> = useRef(null)

  const [selectionIndex, setSelection] = useState(0)

  const updateSelection = (n: 1 | -1) => setSelection(s => clamp(0, s + n, data.entries.length - 1))

  useKeyMap([
    new KeyBinding(
      Key.CSK,
      () => {
        menuOptions.current?.querySelector<HTMLDivElement>(".selected")?.click()
      },
      'Select'
    ),
    new KeyBinding(Key.UP, () => {
      updateSelection(-1)
    }),
    new KeyBinding(Key.DOWN, () => {
      updateSelection(1)
    }),
    new KeyBinding(Key.BACK_CLEAR, () => resolve(null)),
  ])

  useEffect(() => {
    menuOptions.current?.querySelector(".selected")?.scrollIntoView({block:'nearest'})
  }, [selectionIndex])

  useScreenSetup(undefined, true)

  return (
    <div class='bf-menu-popup'>
      <div ref={menuOptions} class='menu'>
        {(data.entries as string[]).map((item, index) => (
          <div
            class={'item' + (index === selectionIndex?' selected':'')}
            tabIndex={4}
            key={'mitem' + index}
            onClick={_ => resolve(index)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export async function openMenu(
  entries: string[],
  nav: NavRemote
): Promise<number | null> {
  return new Promise((resolve, _reject) => {
    nav.push(Menu, { callback: resolve, entries })
  })
}

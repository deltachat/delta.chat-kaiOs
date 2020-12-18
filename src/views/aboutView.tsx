import { h, RefObject } from 'preact'
import { context } from '../manager'
import { KeyBinding, Key } from '../framework/keymanager'
import { useRef, useEffect } from 'preact/hooks'

import aboutMd from '../about_information.md'
import { PreactProps } from '../framework/util'
import { useKeyMap, useScreen, useScreenSetup } from '../framework/router'

export const AboutView = (props: PreactProps) => {
  const { nav } = useScreen()
  const about: RefObject<HTMLDivElement> = useRef(null)

  const goBack = nav.closeCurrent

  useKeyMap([
    new KeyBinding(Key.HELP, goBack),
    new KeyBinding(Key.ESCAPE, goBack),
    new KeyBinding(Key.BACK_CLEAR, goBack),
    new KeyBinding(
      Key.CSK,
      () => {
        window.open('https://delta.chat')
      },
      'Website'
    ),
    //scroll up and down
    new KeyBinding(Key.UP, () => {
      about.current?.parentElement.scrollBy(0, -50)
    }),
    new KeyBinding(Key.DOWN, () => {
      about.current?.parentElement.scrollBy(0, 50)
    }),
  ])

  useScreenSetup('About Delta Chat')

  useEffect(() => {
    if (about.current) about.current.innerHTML = aboutMd
  })

  // Future todo: have tabs to split sections so you don't have to scroll that much
  // - info about delta KaiOS
  // - info about deltachat core
  // - debug menu / log view ?

  // context will be later used to get about information about deltacht core instance
  return <div class='about' ref={about}></div>
}

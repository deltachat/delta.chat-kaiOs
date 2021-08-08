import { RefObject } from 'preact'
import { KeyBinding, Key } from '../framework/keymanager'
import { useRef, useEffect, useState } from 'preact/hooks'

import aboutMd from '../about_information.md'
import { PreactProps } from '../framework/util'
import { useKeyMap, useScreen, useScreenSetup } from '../framework/router'
import { dc_core } from '../manager'

export function AboutView(props: PreactProps) {
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
      about.current?.parentElement?.scrollBy(0, -50)
    }),
    new KeyBinding(Key.DOWN, () => {
      about.current?.parentElement?.scrollBy(0, 50)
    }),
  ])

  useScreenSetup('About Delta Chat')

  const [info, setInfo] = useState<{
    [key: string]: string
  }>()

  useEffect(() => {
    if (about.current) about.current.innerHTML = aboutMd

    dc_core.raw_api.sc_get_info().then(setInfo)
  }, [])

  // Future todo: have tabs to split sections so you don't have to scroll that much
  // - info about delta KaiOS
  // - info about deltachat core
  // - debug menu / log view ?

  return (
    <div>
      <div class='about' ref={about}></div>

      {info &&
        Object.keys(info).map((key) => {
          return (
            <div class='about-info-element'>
              <div class='key'>{key}</div>
              <div class='value'>{info[key]}</div>
            </div>
          )
        })}
    </div>
  )
}

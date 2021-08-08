import { RefObject } from 'preact'
import { KeyBinding, Key } from '../framework/keymanager'
import { useRef, useEffect } from 'preact/hooks'

import { PreactProps } from '../framework/util'
import { useKeyMap, useScreen, useScreenSetup } from '../framework/router'

import {dc_core} from "../manager";

export function ConnectView (props: PreactProps) {
  const { nav } = useScreen()
  const content: RefObject<HTMLDivElement> = useRef(null)

  useKeyMap([
    new KeyBinding(
      Key.CSK,
      async () => {
        try {
          await dc_core.connect()
        } catch (error) {
          console.log(error)
        }
      },
      'Try Again'
    ),
    //scroll up and down
    new KeyBinding(Key.UP, () => {
      content.current?.parentElement?.scrollBy(0, -50)
    }),
    new KeyBinding(Key.DOWN, () => {
      content.current?.parentElement?.scrollBy(0, 50)
    }),
  ])

  useScreenSetup('Delta Chat')

  useEffect(() => {
    
  })

  return <div class='connect-view' ref={content}>
    <h3>Connect to Core</h3>
    <p>The core is a native executable that needs to be running for DC to work</p>
    <p>But currently its not connected, press retry to try connecting again</p>
  </div>
}

import { KeyBinding, Key } from '../framework/keymanager'
import { useEffect } from 'preact/hooks'

import { PreactProps } from '../framework/util'
import { useKeyMap, useScreen, useScreenSetup } from '../framework/router'

export function LoginView (props: PreactProps) {
  const { nav } = useScreen()
  
  useKeyMap([
    
  ])

  useScreenSetup('Email Login')

  useEffect(() => {
  })

  // Future todo: have tabs to split sections so you don't have to scroll that much
  // - info about delta KaiOS
  // - info about deltachat core
  // - debug menu / log view ?

  // context will be later used to get about information about deltacht core instance
  return <div class='login-view'>
      <p>This account is unconfigured, please login</p>
  </div>
}

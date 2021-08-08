import { KeyBinding, Key } from '../framework/keymanager'
import { useEffect, useRef, useState } from 'preact/hooks'

import { PreactProps } from '../framework/util'
import { useKeyMap, useScreen, useScreenSetup } from '../framework/router'
import { RefObject } from 'preact'
import { dc_core } from '../manager'
import { ChatListView } from './chatListView'

async function login({
  email,
  password,
}: {
  email: string | undefined
  password: string | undefined
}) {
  if (!email) throw 'no email specified'
  if (!(await dc_core.raw_api.check_email_validity(email)))
    throw 'invalid email'

  if (!password) throw 'no password specified'

  await dc_core.raw_api.sc_set_config('addr', email)
  await dc_core.raw_api.sc_set_config('mail_pw', password)

  await dc_core.raw_api.sc_configure()
}

export function LoginView(props: PreactProps) {
  const { nav } = useScreen()
  const content: RefObject<HTMLDivElement> = useRef(null)
  const emailElem: RefObject<HTMLInputElement> = useRef(null)
  const passwordElem: RefObject<HTMLInputElement> = useRef(null)

  const [isWorking, setWorking] = useState(false)

  const nextFocus = (modifier: number) => {
    const focusable = content.current?.querySelectorAll('.focusable')
    if (focusable) {
      const f = [...focusable]
      const current = content.current?.querySelector(':focus')
      if (current) {
        const index = f.findIndex((val) => current == val)
        const new_index = index + modifier
        if (new_index >= f.length) {
          ;(f[0] as HTMLDivElement).focus()
        } else if (new_index < 0) {
          ;(f[f.length - 1] as HTMLDivElement).focus()
        } else {
          ;(f[new_index] as HTMLDivElement).focus()
        }
      } else {
        ;(f[0] as HTMLDivElement).focus()
      }
    }
  }

  useKeyMap([
    new KeyBinding(
      Key.RSK,
      isWorking
        ? () => {}
        : () => {
            ;(async () => {
              setWorking(true)
              try {
                const email = emailElem.current?.value
                const password = passwordElem.current?.value
                await login({ email, password })
                nav.setRoot(ChatListView)
              } catch (error) {
                alert(error)
              } finally {
                setWorking(false)
              }
            })()
          },
      isWorking ? '' : 'Login'
    ),
    new KeyBinding(Key.UP, () => {
      nextFocus(-1)
    }),
    new KeyBinding(Key.DOWN, () => {
      nextFocus(+1)
    }),
  ])

  useScreenSetup('Email Login')

  useEffect(() => {})

  return (
    <div class='login-view' ref={content}>
      {isWorking && <div>Logging in...</div>}
      <div className='text-field focusable' tabIndex={0}>
        DeltaChat is an email client, please login to you mailserver
      </div>
      <div class='input-field'>
        <label for='login-email'>Email: </label>
        <input
          ref={emailElem}
          type='text'
          id='login-email'
          className='focusable'
        />
      </div>
      <div class='input-field'>
        <label for='login-pw'>Password: </label>
        <input
          ref={passwordElem}
          type='password'
          id='login-pw'
          className='focusable'
        />
      </div>
      <p className='text-field focusable' tabIndex={0}>
        There are no Delta Chat servers, your data stays on your device.
      </p>
      <details>
        <summary className='focusable'>Show Advanced Options</summary>
        <p>Not yet available</p>
        {/* <div class='input-field'>
          <label for='login-imap-host'>Imap Host: </label>
          <input type='text' id='login-imap-host' className='focusable' />
        </div> */}
      </details>
    </div>
  )
}

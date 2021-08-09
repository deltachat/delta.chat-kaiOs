import { KeyBinding, Key } from '../framework/keymanager'
import { useEffect, useRef, useState } from 'preact/hooks'

import { PreactProps } from '../framework/util'
import { useKeyMap, useScreen, useScreenSetup } from '../framework/router'
import { RefObject } from 'preact'
import { dc_core } from '../manager'
import { ChatListView } from './chatListView'
import { Event } from '../../dc_cmd_api/typescript/src/deltachat'

import { showAlert } from '../framework/dialogs/alert'

function LoginProgress() {
  const { nav, data } = useScreen()

  const { account_id } = data

  const [progressState, setProgressState] = useState<{
    progress: number
    comment: string | null
  }>({ progress: 0, comment: null })

  useKeyMap([
    new KeyBinding(
      Key.LSK,
      async () => {
        await dc_core.raw_api.sc_stop_ongoing_process()
      },
      'Cancel'
    ),
  ])

  useEffect(() => {
    const updateProgress = (ev: Event) => {
      console.info({ progress: ev.field1, account_id })
      if (ev.contextId !== account_id) {
        return
      }

      if (ev.field1 === 1000) {
        nav.closeCurrent()
      }

      setProgressState({
        progress: ev.field1 as number,
        comment: ev.field2 as string | null,
      })
    }

    dc_core.addListener('CONFIGURE_PROGRESS', updateProgress)
    return () => dc_core.removeListener('CONFIGURE_PROGRESS', updateProgress)
  })

  useScreenSetup(undefined, true)

  return (
    <div class='bf-menu-popup'>
      <div class='menu'>
        <progress value={progressState.progress / 10} max={100}>
          {progressState.progress / 10} %
        </progress>
        {progressState.progress / 10} %{progressState.comment}
      </div>
    </div>
  )
}

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
              let account_id = await dc_core.raw_api.get_selected_account_id()
              let closeProgressDialog = nav.push(LoginProgress, { account_id })
              try {
                const email = emailElem.current?.value
                const password = passwordElem.current?.value
                if (!account_id) {
                  throw new Error('no account selected')
                }
                await login({ email, password })

                if (await dc_core.raw_api.sc_is_configured()) {
                  nav.push(ChatListView)
                }
              } catch (error) {
                showAlert(nav, 'Login failed', error)
              } finally {
                setWorking(false)
                closeProgressDialog()
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

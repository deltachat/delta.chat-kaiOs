import { context } from '../manager'
import { RefObject } from 'preact'
import { ChatListItem } from '../mock/deltachat'
import { KeyBinding, Key } from '../framework/keymanager'
import { useRef, useEffect, useState } from 'preact/hooks'
import { debounce, PreactProps } from '../framework/util'
import moment from 'moment'
import { MessageStatusIcon } from '../components/messageStatus'
import { useKeyMap, useScreen } from '../framework/router'
import { ChatView } from './chatView'
import { AboutView } from './aboutView'
import { openMenu } from '../framework/dialogs/menu'

const BaseTabIndexOffset = 20

type avatar_params = { avatarPath: string|null; color: string; displayName: string }
export function Avatar({ avatarPath, color, displayName }: avatar_params) {
  const codepoint = displayName?.codePointAt(0)
  const initial = codepoint
    ? String.fromCodePoint(codepoint).toUpperCase()
    : '#'

  return (
    <div class='avatar' style={{ backgroundColor: color || 'grey' }}>
      {avatarPath ? <img src={avatarPath} /> : <span>{initial}</span>}
    </div>
  )
}

export function ChatListItemElement({
  item,
  focusUpdate,
  onClick,
}: {
  item: ChatListItem
  focusUpdate: (ev: FocusEvent) => void
  onClick: any
}) {
  return (
    <div
      class='chat-list-item'
      onFocus={focusUpdate}
      onBlur={focusUpdate}
      tabIndex={BaseTabIndexOffset + item.ChatId}
      onClick={onClick}
    >
      <Avatar
        avatarPath={item.avatarImage}
        color={item.avatarColor}
        displayName={item.name}
      />
      <div class='main-part'>
        <div class='name'>{item.name}</div>
        <div class='summary'>
          {item.summary.text1} {item.summary.text2}
        </div>
      </div>
      <div class='meta'>
        <div class='timestamp'>
          {moment(item.lastUpdatedTimestamp).fromNow()}
        </div>
        <div class='status'>
          {item.summary.status && (
            <MessageStatusIcon status={item.summary.status} />
          )}
        </div>
      </div>
      <div class='unread-counter' hidden={item.freshMessageCount === 0}>
        {item.freshMessageCount}
      </div>
    </div>
  )
}

export const ChatListView = (props: PreactProps) => {
  const { nav } = useScreen()

  const list: RefObject<HTMLDivElement> = useRef(null)
  const [_aChatSelected, setAChatSelected] = useState(false)

  useEffect(() => {
    if (!list.current?.querySelector(':focus'))
      (list.current?.firstChild as HTMLElement)?.focus()
  })

  useKeyMap([
    new KeyBinding(
      Key.LSK,
      async () => {
        const selection = await openMenu(
          ['Settings', 'Verify contact (qr)', 'About', 'Debug Menu'],
          nav
        )
        if (selection !== null) {
          switch (selection) {
            case 0:
              console.log('Selected open settings')
              break
            case 1:
              console.log('show/scan qr code here')
              break
            case 2:
              nav.push(AboutView)
              break
            case 3:
              console.log('Debug menu')
              break
          }
        }
      },
      'Menu'
    ),
    new KeyBinding(
      Key.CSK,
      () => {
        if (list.current?.querySelector(':focus') !== null) {
          ;(list.current?.querySelector(':focus') as HTMLElement)?.click()
        } else {
          ;(list.current?.firstChild as HTMLElement).focus()
        }
      },
      'Select'
    ),
    new KeyBinding(Key.RSK, () => {}),
    new KeyBinding(Key.UP, () => {
      const target = list.current?.querySelector(':focus')
        ?.previousSibling as HTMLDivElement
      target?.focus()
    }),
    new KeyBinding(Key.DOWN, () => {
      const target = list.current?.querySelector(':focus')
        ?.nextSibling as HTMLDivElement
      target?.focus()
    }),
    new KeyBinding(Key.HELP, () => {
      nav.push(AboutView)
    }),
    new KeyBinding(Key.F1, () => {
      nav.push(AboutView)
    }),
  ])

  const OpenChat = (chatId: number) => {
    nav.setRoot(ChatView, { chatId })
  }

  const focusUpdate = debounce(
    // this updates the state on selection
    () => setAChatSelected(list.current?.querySelector(':focus') !== null),
    100
  )

  return (
    <div>
      <div ref={list}>
        {context.chatList.map(item => (
          <ChatListItemElement
            item={item}
            focusUpdate={focusUpdate}
            onClick={OpenChat.bind(null, item.ChatId)}
          />
        ))}
      </div>
    </div>
  )
}

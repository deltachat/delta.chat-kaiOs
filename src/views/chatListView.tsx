import { dc_core } from '../manager'
import { RefObject } from 'preact'
import { KeyBinding, Key } from '../framework/keymanager'
import { useRef, useEffect, useState, useMemo, useCallback } from 'preact/hooks'
import { debounce, PreactProps } from '../framework/util'
import moment from 'moment'
import { MessageStatusIcon } from '../components/messageStatus'
import { useKeyMap, useScreen } from '../framework/router'
import { ChatView } from './chatView'
import { AboutView } from './aboutView'
import { openMenu } from '../framework/dialogs/menu'
import { ChatListItemFetchResult_Type } from '../../dc_cmd_api/typescript/src/bindings'

const BaseTabIndexOffset = 20

type avatar_params = {
  avatarPath?: string | null
  color: string
  displayName: string
}
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
}: {
  item: ChatListItemFetchResult_Type
}) {
  const { nav } = useScreen()

  if (item.type === 'ArchiveLink') {
    return (
      <div
        class='chat-list-item archive-link'
        tabIndex={BaseTabIndexOffset}
        onClick={() => {
          alert('TODO')
        }}
      >
        Archive Link
      </div>
    )
  }
  let content
  if (item.type === 'ChatListItem') {
    content = (
      <>
        <Avatar
          avatarPath={item.avatarPath}
          color={item.color}
          displayName={item.name}
        />
        <div class='main-part'>
          <div class='name'>{item.name}</div>
          <div class='summary'>
            {item.summaryText1} {item.summaryText2}
          </div>
        </div>
        <div class='meta'>
          {item.lastUpdated && (
            <div class='timestamp'>{moment(item.lastUpdated).fromNow()}</div>
          )}
          <div class='status'>
            {item.summaryStatus !== 0 && (
              <MessageStatusIcon status={item.summaryStatus} />
            )}
          </div>
        </div>
        <div class='unread-counter' hidden={item.freshMessageCounter === 0}>
          {item.freshMessageCounter}
        </div>
      </>
    )
  } else {
    content = (
      <>
        <Avatar color='grey' displayName={'?'} />
        <div class='main-part'>
          <div class='name'>{`Error Loading Chat id:${item.id}`}</div>
          <div class='summary'>{String(item.error)}</div>
        </div>
      </>
    )
  }
  return (
    <div
      class='chat-list-item'
      tabIndex={BaseTabIndexOffset + item.id}
      onClick={() => {
        nav.setRoot(ChatView, { chatId: item.id })
      }}
    >
      {content}
    </div>
  )
}

export const ChatListView = (props: PreactProps) => {
  const { nav } = useScreen()

  const list: RefObject<HTMLDivElement> = useRef(null)

  useEffect(() => {
    if (!list.current?.querySelector(':focus'))
      (list.current?.firstChild as HTMLElement)?.focus()
  })

  useKeyMap([
    new KeyBinding(
      Key.LSK,
      async () => {
        const selection = await openMenu(
          ['Settings', 'Scan QR', 'About', 'Debug Menu'],
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
    new KeyBinding(Key.RSK, () => {}, 'New'),
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

  const [chatList, setChatList] = useState<ChatListItemFetchResult_Type[]>([])

  const refresh = useCallback(async () => {
    const entries = await dc_core.raw_api.sc_get_chatlist_entries(0, null, null)
    const entry_store = await dc_core.raw_api.sc_get_chatlist_items_by_entries(
      entries
    )
    const chatlist = entries.map(([chatId]) => entry_store[chatId])
    console.log({ entries, entry_store, chatlist })
    setChatList(chatlist)
  }, [])

  const debouncedRefresh = useMemo(() => debounce(refresh, 350), [])

  useEffect(() => {
    refresh()
    dc_core.addListener('MSGS_CHANGED', debouncedRefresh)
    dc_core.addListener('MSG_READ', debouncedRefresh)
    dc_core.addListener('CHAT_MODIFIED', debouncedRefresh)
    dc_core.addListener('INCOMING_MSG', debouncedRefresh)
    return () => {
      dc_core.removeListener('MSGS_CHANGED', debouncedRefresh)
      dc_core.removeListener('MSG_READ', debouncedRefresh)
      dc_core.removeListener('CHAT_MODIFIED', debouncedRefresh)
      dc_core.removeListener('INCOMING_MSG', debouncedRefresh)
    }
  }, [])

  // TODO archived chats toggle

  return (
    <div>
      <div ref={list}>
        {chatList.map((item) => {
          return <ChatListItemElement item={item} />
        })}
      </div>
    </div>
  )
}

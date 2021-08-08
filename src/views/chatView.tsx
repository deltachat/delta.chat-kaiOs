import { RefObject } from 'preact'
import { Message } from '../mock/deltachat'
import { useRef, useState, useEffect } from 'preact/hooks'
import { KeyBinding, Key } from '../framework/keymanager'
import { debounce, PreactProps } from '../framework/util'
import moment from 'moment'

import { MessageStatusIcon } from '../components/messageStatus'

import { context } from '../manager'
import { useKeyMap, useScreenSetup, useScreen } from '../framework/router'
import { ChatListView } from './chatListView'

const BaseTabIndexOffset = 40

function MessageElement(props: any) {
  const message: Message = props.message
  const focusUpdate: (ev: FocusEvent) => void = props.focusUpdate

  return (
    <div
      class={`message ${message.isIncomming() ? 'incomming' : 'outgoing'}`}
      onFocus={focusUpdate}
      onBlur={focusUpdate}
      tabIndex={BaseTabIndexOffset + message.messageId}
    >
      <div class="text">
        {message.text}
      </div>
      <div class='meta'>
        <span class='timestamp'>{moment(message.timestamp).fromNow()}</span>
        {message.isOutgoing() && (
          <span class='status'>
            <MessageStatusIcon status={message.status} />
          </span>
        )}
      </div>
    </div>
  )
}

export function ChatView(props: PreactProps) {
  const { data, nav } = useScreen()
  const list: RefObject<HTMLDivElement> = useRef(null)
  const composer: RefObject<HTMLInputElement> = useRef(null)
  const [isAMessageSelected, setMessageSelected] = useState(false)

  const selectInputField = () => {
    const inputField = list.current?.querySelector(
      '#message-input'
    ) as HTMLInputElement
    inputField?.focus()
  }

  // data.chatId
  // todo call this only on render if this screen is focused and has no dialog infront of it
  useKeyMap(
    [
      new KeyBinding(
        Key.LSK,
        () => {},
        isAMessageSelected ? (
          'Options'
        ) : (
          <img src="../images/icons/paperclip.svg" class="attachment-icon"/>
        )
      ),
      new KeyBinding(
        Key.CSK,
        () => {
          // is input field selected
        },
        isAMessageSelected ? 'Info' : 'Send'
      ),
      new KeyBinding(Key.BACK_CLEAR, () => {
        // if the input field is not selected
        console.log('should go back to chat list view')
        nav.setRoot(ChatListView)
        // else if input field is empty, deselect it
        // or rather do this thinf dependent on a state
      }),
      new KeyBinding(Key.RSK, () => {}, 'More'),
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
    ],
    [isAMessageSelected]
  )

  useScreenSetup(context.getChatName(data.chatId))

  const focusUpdate = debounce(() => {
    const selectedItem = list.current?.querySelector(':focus')
    if (selectedItem) {
      if (selectedItem.classList.contains('message')) {
        // future todo: save message type to a state var
        setMessageSelected(true)
      } else if (selectedItem.id === 'message-input') {
        setMessageSelected(false)
      }
    }
  }, 100)

  useEffect(() => selectInputField(), [])

  return (
    <div class='content'>
      {JSON.stringify(data)}
      <div ref={list}>
        {context.getAllMessagesForChat(data.chatId).map(message => (
          <MessageElement message={message} focusUpdate={focusUpdate} />
        ))}
        <input
          id='message-input'
          ref={composer}
          type='text'
          onFocus={focusUpdate}
        />
      </div>
    </div>
  )
}

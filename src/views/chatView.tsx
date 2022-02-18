import { RefObject } from 'preact'
import { Message } from '../mock/deltachat'
import { useRef, useState, useEffect, useMemo } from 'preact/hooks'
import { KeyBinding, Key } from '../framework/keymanager'
import { debounce, PreactProps } from '../framework/util'
import moment from 'moment'

import { MessageStatusIcon } from '../components/messageStatus'

import { context, dc_core } from '../manager'
import { useKeyMap, useScreenSetup, useScreen } from '../framework/router'
import { ChatListView } from './chatListView'
import {
  FullChat_Type,
  Message_Type,
} from '../../dc_cmd_api/typescript/src/bindings'
import { Event } from '../../dc_cmd_api/typescript/src/deltachat'
import { showAlert } from '../framework/dialogs/alert'

const BaseTabIndexOffset = 40

function MessageElement({
  focusUpdate,
  message,
}: {
  focusUpdate: (ev: FocusEvent) => void
  message: Message_Type
}) {
  const direction = message.from_id !== 1 ? 'incoming' : 'outgoing'
  return (
    <div
      class={`message ${direction}`}
      onFocus={focusUpdate}
      onBlur={focusUpdate}
      tabIndex={BaseTabIndexOffset + message.id}
    >
      <div class='text'>{message.text}</div>
      <div class='meta'>
        <span class='timestamp'>
          {moment(message.timestamp * 1000).fromNow()}
        </span>
        {direction == 'outgoing' && (
          <span class='status'>
            <MessageStatusIcon status={message.state} />
          </span>
        )}
      </div>
    </div>
  )
}

export function ChatView(props: PreactProps) {
  const { data, nav } = useScreen()
  const { chatId } = data
  const list: RefObject<HTMLDivElement> = useRef(null)
  const composer: RefObject<HTMLInputElement> = useRef(null)
  const [selectionType, setSelectionType] = useState<
    'input' | 'message' | null
  >(null)

  const [chat, setChat] = useState<FullChat_Type>()
  const [messageList, setMessageList] = useState<Message_Type[]>([])

  useEffect(() => {
    const refreshChat = async () => {
      const chat = await dc_core.raw_api.sc_chatlist_get_full_chat_by_id(chatId)
      setChat(chat)
    }

    const refreshMessages = async () => {
      const msg_ids = await dc_core.raw_api.sc_message_list_get_message_ids(
        chatId,
        0
      )
      const messages = await dc_core.raw_api.sc_message_get_messages(msg_ids)
      const msg_array = msg_ids.map((id) => messages[id])
      setMessageList(msg_array)
    }

    const chatModified = (ev: Event) => {
      if (ev.field1 == chatId) {
        refreshChat()
      }
    }

    const messageChanged = (ev: Event) => {
      if (ev.field1 == chatId) {
        refreshMessages()
      }
    }

    refreshChat()
    refreshMessages()

    dc_core.addListener('CHAT_MODIFIED', chatModified)
    dc_core.addListener('MSGS_CHANGED', messageChanged)
    dc_core.addListener('MSG_DELIVERED', messageChanged)
    dc_core.addListener('MSG_FAILED', messageChanged)
    dc_core.addListener('MSG_READ', messageChanged)
    return () => {
      dc_core.removeListener('CHAT_MODIFIED', chatModified)
      dc_core.removeListener('MSGS_CHANGED', messageChanged)
      dc_core.removeListener('MSG_DELIVERED', messageChanged)
      dc_core.removeListener('MSG_FAILED', messageChanged)
      dc_core.removeListener('MSG_READ', messageChanged)
    }
  }, [])

  let can_send = chat && !chat.is_contact_request && !chat.is_device_chat

  let softKeys: KeyBinding[] = []

  if (chat) {
    if (chat.is_contact_request) {
      softKeys = [
        new KeyBinding(
          Key.LSK,
          async () => {
            await dc_core.raw_api.sc_block_chat(chat.id)
          },
          'Block'
        ),
        new KeyBinding(
          Key.RSK,
          async () => {
            await dc_core.raw_api.sc_accept_chat(chat.id)
          },
          'Accept'
        ),
      ]
    } else {
      if (selectionType == 'message') {
        softKeys = [
          new KeyBinding(Key.LSK, () => {}, 'Options'),
          new KeyBinding(Key.CSK, () => {}, 'Info'),
          new KeyBinding(Key.RSK, () => {}, 'More'),
        ]
      } else if (selectionType == 'input' && can_send) {
        // TODO check if input field is really selected
        softKeys = [
          new KeyBinding(
            Key.LSK,
            () => {},
            <img src='../images/icons/paperclip.svg' class='attachment-icon' />
          ),
          new KeyBinding(
            Key.CSK,
            async () => {
              const composer_element = composer.current
              if (composer_element) {
                const text = composer_element.value
                composer_element.disabled = true
                try {
                  await dc_core.raw_api.sc_misc_send_text_message(text, chatId)
                  composer_element.value = ''
                } catch (error) {
                  showAlert(nav, 'error sending', String(error))
                } finally {
                  composer_element.disabled = false
                }
              }
            },
            'Send'
          ),
          // new KeyBinding(Key.RSK, () => {}, 'More'),
        ]
      }
    }
  }

  useKeyMap(
    [
      ...softKeys,
      new KeyBinding(Key.BACK_CLEAR, () => {
        // if the input field is not selected
        console.log('should go back to chat list view')
        nav.setRoot(ChatListView)
        // else if input field is empty, deselect it
        // or rather do this thinf dependent on a state
      }),
      new KeyBinding(Key.UP, () => {
        const target = list.current?.querySelector(':focus')
          ?.previousSibling as HTMLDivElement
        if (target) {
          target.focus()
        } else {
          ;(
            list.current?.lastElementChild as HTMLInputElement | HTMLDivElement
          )?.focus()
        }
      }),
      new KeyBinding(Key.DOWN, () => {
        const target = list.current?.querySelector(':focus')
          ?.nextSibling as HTMLDivElement
        if (target) {
          target.focus()
        } else {
          ;(
            list.current?.firstElementChild as HTMLInputElement | HTMLDivElement
          )?.focus()
        }
      }),
    ],
    [chat, chat?.is_contact_request, selectionType]
  )

  useScreenSetup(chat?.name)

  const focusUpdate = useMemo(
    () =>
      debounce(() => {
        const selectedItem = list.current?.querySelector(':focus')
        if (selectedItem) {
          if (selectedItem.classList.contains('message')) {
            // future todo: save message type to a state var
            setSelectionType('message')
          } else if (selectedItem.id === 'message-input') {
            setSelectionType('input')
          }
        }
      }, 100),
    []
  )

  // initial selection
  useEffect(() => {
    if (can_send) {
      const inputField = list.current?.querySelector(
        '#message-input'
      ) as HTMLInputElement
      inputField?.focus()
    } else {
      ;(list.current?.lastChild as HTMLInputElement | HTMLDivElement)?.focus()
    }
  }, [!!chat])

  return (
    <div class='content'>
      <div ref={list}>
        {messageList.map((message) => (
          <MessageElement message={message} focusUpdate={focusUpdate} />
        ))}
        {can_send && (
          <input
            id='message-input'
            ref={composer}
            type='text'
            onFocus={focusUpdate}
          />
        )}
      </div>
    </div>
  )
}

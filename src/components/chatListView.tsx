import { context } from "../manager";
import { Component, h, Ref, RefObject } from "preact";
import { ChatListItem, Context } from "../mock/deltachat";
import { SoftwareKeys } from "./softwareButtonBar";
import { setKeyMap, KeyBinding, Key } from "../keymanager";
import { useRef, useEffect, useState } from "preact/hooks";
import { debounce } from "../util";


const BaseTabIndexOffset = 20

export function ChatListItemElement(props: any) {
    const item: ChatListItem = props.item
    const focusUpdate: (ev: FocusEvent) => void = props.focusUpdate

    return (
        <div
            class="chat-list-item"
            onFocus={focusUpdate}
            onBlur={focusUpdate}
            tabIndex={BaseTabIndexOffset + item.ChatId}
            onClick={props.onClick}
        >
            <div class="name">{item.name}</div>
            <div class="unread-counter" hidden={item.unreadMessageCount === 0}>{item.unreadMessageCount}</div>
        </div>
    )
}


export const ChatListView = (props: any) => {
    const list: RefObject<HTMLDivElement> = useRef(null)
    const [aChatSelected, setAChatSelected] = useState(false)

    useEffect(()=>{
        (list.current?.firstChild as HTMLElement).focus()
    })

    setKeyMap(
        new KeyBinding(Key.LSK, () => { }),
        new KeyBinding(Key.CSK, () => {
            if (list.current?.querySelector(":focus") !== null) {
                (list.current?.querySelector(":focus") as HTMLElement)?.click()
            } else {
                (list.current?.firstChild as HTMLElement).focus()
            }
        }),
        new KeyBinding(Key.RSK, () => { }),
        new KeyBinding(Key.UP, () => {
            const target = list.current?.querySelector(":focus")?.previousSibling as HTMLDivElement
            target?.focus()
        }),
        new KeyBinding(Key.DOWN, () => {
            const target = list.current?.querySelector(":focus")?.nextSibling as HTMLDivElement
            target?.focus()
        }),
    )

    const OpenChat = (chatId: number) => {
        props?.goto("chat",{chatId})
    }

    const focusUpdate = debounce(
        () => setAChatSelected(list.current?.querySelector(":focus") !== null), 100
    )

    const context: Context = props.context
    return <div>
        <div ref={list}>
            {
                context.chatList.map((item) =>
                    <ChatListItemElement
                        item={item}
                        focusUpdate={focusUpdate}
                        onClick={OpenChat.bind(null, item.ChatId)}
                    />
                )
            }
        </div>
        <div class="software-keys-spacer"></div>
        <SoftwareKeys
            leftBtnLabel="Menu"
            centerBtnLabel={aChatSelected?"Select":""}
            rightBtnLabel="New"
        />
    </div>
};


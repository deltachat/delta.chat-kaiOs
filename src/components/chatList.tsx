import { context } from "../manager";
import { Component, h, Ref, RefObject } from "preact";
import { ChatListItem, Context } from "../mock/deltachat";
import { SoftwareKeys } from "./softwareButtonBar";
import { setKeyMap, KeyBinding } from "../keymanager";
import { useRef, useEffect } from "preact/hooks";


const BaseTabIndexOffset = 20

export function ChatListItemElement(props) {
    const item: ChatListItem = props.item

    return <div class="chat-list-item" tabIndex={BaseTabIndexOffset + item.ChatId} onClick={props.onClick}>
        {item.name}
        <div class="unread-counter" hidden={item.unreadMessageCount === 0}>{item.unreadMessageCount}</div>
    </div>
}


export const ChatListView = (props) => {
    const list:RefObject<HTMLDivElement> = useRef(null)

    setKeyMap(
        new KeyBinding("SoftLeft", ()=>{}),
        new KeyBinding("Enter", ()=>{
            if(list.current?.querySelector(":focus") !== null){
                (list.current?.querySelector(":focus") as HTMLElement)?.click()
            } else {
                (list.current?.firstChild as HTMLElement).focus()
            }
        }),
        new KeyBinding("SoftRight", ()=>{}),
        new KeyBinding("ArrowUp", () => {
            const target = list.current?.querySelector(":focus")?.previousSibling as HTMLDivElement
            target?.focus()
        }),
        new KeyBinding("ArrowDown", () => {
            const target = list.current?.querySelector(":focus")?.nextSibling as HTMLDivElement
            target?.focus()
        }),
    )

    const OpenChat = (chatId:number)=>{
        alert(`will open chat ${chatId}`)
    }

    const context:Context = props.context
    return <div ref={list}>
        {
            context.chatList.map((item) =>
                <ChatListItemElement item={item} onClick={OpenChat.bind(null, item.ChatId)}></ChatListItemElement>
            )
        }
        <SoftwareKeys 
            leftBtnLabel="Menu"
            centerBtnLabel="Select"
            rightBtnLabel="New"
        />
    </div>
};


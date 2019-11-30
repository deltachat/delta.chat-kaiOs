import { context } from "../manager";
import { Component, h } from "preact";
import { ChatListItem, Context } from "../mock/deltachat";
import { SoftwareKeys } from "./softwareButtonBar";

const BaseTabIndexOffset = 20

export function ChatListItemElement(props) {
    const item: ChatListItem = props.item

    return <div class="chat-list-item" tabIndex={BaseTabIndexOffset + item.ChatId}>
        {item.name}
        <div class="unread-counter" hidden={item.unreadMessageCount === 0}>{item.unreadMessageCount}</div>
    </div>
}


export const ChatListView = (props) => {
    const context:Context = props.context


    return <div>
        {
            context.chatList.map((item) =>
                <ChatListItemElement item={item}></ChatListItemElement>
            )
        }
        <SoftwareKeys 
            leftBtnLabel="Settings"
            centerBtnLabel="Select"
            rightBtnLabel="New"
        />
    </div>
};


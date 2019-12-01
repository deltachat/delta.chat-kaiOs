import { h, RefObject } from "preact";
import { SoftwareKeys } from "./softwareButtonBar";
import { Context, Message } from "../mock/deltachat";
import { useRef, useState} from "preact/hooks";
import { setKeyMap, KeyBinding } from "../keymanager";
import { debounce } from "../util";

const BaseTabIndexOffset = 40


function MessageElement(props: any) {
    const message: Message = props.message
    const focusUpdate: (ev: FocusEvent) => void = props.focusUpdate

    return <div
        class={`message ${message.direction}`}
        onFocus={focusUpdate}
        onBlur={focusUpdate}
        tabIndex={BaseTabIndexOffset + message.messageId} >
        {message.text}
    </div>
}

export function ChatView(props: any) {
    const data = props.data
    const list: RefObject<HTMLDivElement> = useRef(null)
    const composer: RefObject<HTMLInputElement> = useRef(null)
    const [isAMessageSelected, setMessageSelected] = useState(false)

    // data.chatId
    setKeyMap(
        new KeyBinding("SoftLeft", () => { }),
        new KeyBinding("Enter", () => {
            // is input field selected
        }),
        new KeyBinding("Escape", () => {
            // Is that the back button?
            console.log("should go back to chat list view")
            props?.goto("chatList")
        }),
        new KeyBinding("SoftRight", () => { }),
        new KeyBinding("ArrowUp", () => {
            const target = list.current?.querySelector(":focus")?.previousSibling as HTMLDivElement
            target?.focus()
        }),
        new KeyBinding("ArrowDown", () => {
            const target = list.current?.querySelector(":focus")?.nextSibling as HTMLDivElement
            target?.focus()
        }),
    )


    const focusUpdate = debounce(
        () => setMessageSelected(list.current?.querySelector(":focus") !== null), 100
    )

    const context: Context = props.context
    return <div>
        <div ref={list}>
            {
                context.getAllMessagesForChat(1).map((message) =>
                    <MessageElement message={message} focusUpdate={focusUpdate} />
                )
            }
        </div>
        {JSON.stringify(data)}
        <input class="message-input" ref={composer} type="text" />
        <SoftwareKeys
            leftBtnLabel={isAMessageSelected ? "Options" : "Attachment"} // Attachment or Message options (depends on wether a message or the input field selected)
            centerBtnLabel=""
            rightBtnLabel="Send" // or audio message (depends wether message input field is empty)
        />
    </div>
}
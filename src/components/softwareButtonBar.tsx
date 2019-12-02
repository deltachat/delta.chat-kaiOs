import { h } from "preact"
import { Key } from "../keymanager"

export function SoftwareKeys(props: any) {
    const { leftBtnLabel, centerBtnLabel, rightBtnLabel } = props

    return <div class="software-keys" id="software-keys">
        <button
            tabIndex={-1}
            onMouseDown={emulateKeyPress.bind(null, Key.LSK)}
        >{leftBtnLabel}</button>
        <button
            tabIndex={-1}
            class="middle"
            onMouseDown={emulateKeyPress.bind(null, Key.CSK)}
        >{centerBtnLabel}</button>
        <button
            tabIndex={-1}
            onMouseDown={emulateKeyPress.bind(null, Key.RIGHT)}
        >{rightBtnLabel}</button>
    </div>
}

let lastFocusedElement: HTMLElement;

document.addEventListener('focusout', ev => {
    if ((ev.target as HTMLElement)?.parentElement?.id !== "software-keys")
        lastFocusedElement = ev.target as HTMLElement
})
function emulateKeyPress(key: string, ev: MouseEvent) {
    ev.stopImmediatePropagation()
    ev.preventDefault()
    const target = lastFocusedElement || document
    const oncefocus = () => {
        setTimeout(() => {
            var keyboardEvent: KeyboardEvent = new KeyboardEvent('keydown', { key })
            target.dispatchEvent(keyboardEvent);
        }, 10)
        lastFocusedElement?.removeEventListener('focus', oncefocus)
    }
    if (lastFocusedElement) {
        lastFocusedElement?.addEventListener('focus', oncefocus)
        lastFocusedElement?.focus()
    } else {
        oncefocus()
    }
    console.log("press", lastFocusedElement)
}
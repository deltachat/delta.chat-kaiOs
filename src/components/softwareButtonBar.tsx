import { h } from "preact"
import { Key } from "../keymanager"

export function SoftwareKeys(props: any) {
    const { leftBtnLabel, centerBtnLabel, rightBtnLabel } = props

    return <div class="software-keys" id="software-keys">
        <button
            onClick={emulateKeyPress.bind(null, Key.LSK)}
        >{leftBtnLabel}</button>
        <button
            class="middle"
            // onClick={emulateKeyPress.bind(null, Key.CSK)}
            // Please use the enter key instead of emulating a click with this
        >{centerBtnLabel}</button>
        <button
            onClick={emulateKeyPress.bind(null, Key.RIGHT)}
        >{rightBtnLabel}</button>
    </div>
}

let lastFocusedElement:HTMLElement;

document.addEventListener('focusout', ev => {
    if ((ev.target as HTMLElement)?.parentElement?.id !== "software-keys")
        lastFocusedElement = ev.target as HTMLElement
})
function emulateKeyPress(key: string, ev:MouseEvent) {
    ev.stopPropagation()
    ev.preventDefault()
    const target = lastFocusedElement || document
    const oncefocus = ()=>{
        setTimeout(()=>{
            var keyboardEvent: KeyboardEvent = new KeyboardEvent('keydown', { key })
            target.dispatchEvent(keyboardEvent);
        }, 10)
        lastFocusedElement?.removeEventListener('focus', oncefocus)
    }
    if(lastFocusedElement){
        lastFocusedElement?.addEventListener('focus', oncefocus)
        lastFocusedElement?.focus()
    }else {
        oncefocus()
    }
    console.log("press", lastFocusedElement)
}
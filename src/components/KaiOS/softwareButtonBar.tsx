import { h } from "preact"
import { Key } from "../../keymanager"

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


function emulateKeyPress(key: string, ev: MouseEvent) {
    ev.stopImmediatePropagation()
    ev.preventDefault()
    const target = document.querySelector(":focus") || document
    var keyboardEvent: KeyboardEvent = new KeyboardEvent('keydown', { key, bubbles: true })
    target.dispatchEvent(keyboardEvent);
    console.log("emulate button: press", key, target, keyboardEvent)
}
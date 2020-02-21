import { h } from "preact"
import { Key, KeyBinding } from "../../keymanager"

export function SoftwareKeys({keymap}:{keymap:KeyBinding[]}) {

    return <div class="software-keys" id="software-keys">
        <button
            tabIndex={-1}
            onMouseDown={emulateKeyPress.bind(null, Key.LSK)}
        >{keymap?.find(({key}) => key === Key.LSK)?.label}</button>
        <button
            tabIndex={-1}
            class="middle"
            onMouseDown={emulateKeyPress.bind(null, Key.CSK)}
        >{keymap?.find(({key}) => key === Key.CSK)?.label}</button>
        <button
            tabIndex={-1}
            onMouseDown={emulateKeyPress.bind(null, Key.RIGHT)}
        >{keymap?.find(({key}) => key === Key.RIGHT)?.label}</button>
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
import { h } from "preact"

export function SoftwareKeys(props: any) {
    const { leftBtnLabel, centerBtnLabel, rightBtnLabel } = props

    return <div class="software-keys">
        <div
            onClick={emulateKeyPress.bind(null, 'SoftLeft')}
        >{leftBtnLabel}</div>
        <div
            class="middle"
            // Please use the enter key instead of emulating a click with this
        >{centerBtnLabel}</div>
        <div
            onClick={emulateKeyPress.bind(null, 'SoftRight')}
        >{rightBtnLabel}</div>
    </div>
}

function emulateKeyPress(key: string, ev:MouseEvent) {
    ev.preventDefault()
    var keyboardEvent: KeyboardEvent = new KeyboardEvent('keydown', { key })
    const target = document.querySelector(":focus") || document
    target.dispatchEvent(keyboardEvent);
}
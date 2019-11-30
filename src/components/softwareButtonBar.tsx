import { h } from "preact"

export function SoftwareKeys(props:any) {
    const { leftBtnLabel, centerBtnLabel, rightBtnLabel } = props

    return <div class="software-keys">
        <div>{leftBtnLabel}</div>
        <div class="middle">{centerBtnLabel}</div>
        <div>{rightBtnLabel}</div>
    </div>
}
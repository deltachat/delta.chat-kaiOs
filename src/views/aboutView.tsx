import { h, RefObject } from "preact"
import { context } from '../manager'
import { KeyBinding, Key } from "../framework/keymanager"
import { useRef, useEffect } from "preact/hooks"

import * as aboutMd from "../about_information.md"
import { ScreenProps } from "../framework/screen"

export const AboutView = ({ctrl}: ScreenProps) => {
    const about: RefObject<HTMLDivElement> = useRef(null)

    const goBack = () => { ctrl.nav.closeScreen() };

    ctrl.screen.setKeyMap(
        new KeyBinding(Key.HELP, goBack),
        new KeyBinding(Key.F1, goBack),
        new KeyBinding(Key.BACK_CLEAR, goBack),
        new KeyBinding(Key.CSK, () => {
            window.open("https://delta.chat")
        }, "Website"),
        //scroll up and down
        new KeyBinding(Key.UP, () => { about.current?.parentElement.scrollBy(0, -50) }),
        new KeyBinding(Key.DOWN, () => { about.current?.parentElement.scrollBy(0, 50) }),
    )

    var HeadText = [..."About Delta Chat"]

    setInterval(()=>{
        HeadText.push(HeadText.shift())
        ctrl.screen.setHeader(HeadText.join("")) 
    }, 600)

    useEffect(() => { if (about.current) about.current.innerHTML = aboutMd.html })

    // Future todo: have tabs to split sections so you don't have to scroll that much
    // - info about delta KaiOS
    // - info about deltachat core
    // - debug menu / log view ?

    // context will be later used to get about information about deltacht core instance
    return <div class="about" ref={about}></div>

};

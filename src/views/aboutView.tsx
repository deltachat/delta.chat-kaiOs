import { h, RefObject } from "preact";
import { Context } from "../mock/deltachat";
import { SoftwareKeys } from "../components/KaiOS/softwareButtonBar";
import { setKeyMap, KeyBinding, Key } from "../keymanager";
import { useRef, useEffect } from "preact/hooks";

import * as aboutMd from "../about_information.md"
import { Header } from "../components/KaiOS/header";

export const AboutView = (props: any) => {
    const about: RefObject<HTMLDivElement> = useRef(null)

    const goBack = () => {props?.goto("chatList")};

    setKeyMap(
        new KeyBinding(Key.HELP, goBack),
        new KeyBinding(Key.F1, goBack),
        new KeyBinding(Key.BACK_CLEAR, goBack),
        new KeyBinding(Key.CSK, () => {
            window.open("https://delta.chat")
        }),
        //scroll up and down
        new KeyBinding(Key.UP, () => {about.current?.parentElement.scrollBy(0, -50)}),
        new KeyBinding(Key.DOWN, () => {about.current?.parentElement.scrollBy(0, 50)}),
    )

    useEffect(()=> {if(about.current) about.current.innerHTML = aboutMd.html})

    // Future todo: have tabs to split sections so you don't have to scroll that much
    // - info about delta KaiOS
    // - info about deltachat core
    // - debug menu / log view ?

    // context will be later used to get about information about deltacht core instance
    const context: Context = props.context 
    return <div class="screen-wrapper">
        <Header>About Delta Chat</Header>
        <div class="content">
            <div class="about" ref={about}></div>
        </div>
        <SoftwareKeys
            leftBtnLabel=""
            centerBtnLabel="Website"
            rightBtnLabel=""
        />
    </div>
};

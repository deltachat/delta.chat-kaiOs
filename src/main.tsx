import { h, render, Component, JSX } from 'preact';
import { useState } from 'preact/hooks'
import { ChatListView } from './views/chatListView';
import { __setGlobalKeyMap, KeyBinding } from './keymanager';
import { ChatView } from './views/chatView';
import { AboutView } from './views/aboutView'
import { Header } from './components/KaiOS/header';
import { SoftwareKeys } from './components/KaiOS/softwareButtonBar'

function getScreen(screen_id: string) {
    switch (screen_id) {
        case "chatList":
            return ChatListView
        case "chat":
            return ChatView
        case "about":
            return AboutView
        default:
            return () => <p>Loading</p>
    }
}

export interface ScreenProps {
    ctrl: {
        screen: {
            setKeyMap: (...keymap: KeyBinding[]) => void
            setHeader: (header: string | h.JSX.Element) => void
        },
        nav: {
            pushScreen: (screen_id: string, initData: { [key: string]: any }) => void
            setRootScreen: (screen_id: string, initData: { [key: string]: any }) => void
            closeScreen: () => void
        }
    },
    goto: (screen_id: string, initData: { [key: string]: any }) => void
}

class NavElement {
    screen_functions: {

    }
    public keymap: KeyBinding[]
    public header: string | h.JSX.Element
    constructor(
        public screen: (props: any) => h.JSX.Element,
        private keymap_hook: any,
        private header_hook: any,
        public initData: { [key: string]: any }
    ) {
        this.screen_functions = {
            setKeyMap: this.setKeyMap.bind(this),
            setHeader: this.setHeader.bind(this)
        }
    }

    renderElement() {
        return <this.screen screen_functions={this.screen_functions} />
    }

    setKeyMap(...keymap: KeyBinding[]) {
        this.keymap = keymap
        this.keymap_hook(this)
    }

    setHeader(header: string | h.JSX.Element) {
        this.header = header
        this.header_hook(this)
    }
}

class Nav extends Component {
    stack: NavElement[] = []

    render(): import("preact").ComponentChild {
        const top_element = this.stack.length > 0 && this.stack[this.stack.length - 1]
        __setGlobalKeyMap(...top_element?.keymap)
        return <div class="screen-wrapper">
            <Header>{top_element?.header}</Header>
            <div class="content" >
                {
                    this.stack.map((element, index) => {
                        const nav_functions = {
                            pushScreen: this.pushScreen.bind(this),
                            setRootScreen: this.setRootScreen.bind(this),
                            closeScreen: () => this.closeScreen(element)
                        }
                        return <div style={{ "z-index": index, position: 'relative' }} >
                            <element.screen
                                ctrl={{
                                    nav: nav_functions,
                                    screen: element.screen_functions,
                                }}
                            />
                        </div>
                    })
                }
                <SoftwareKeys keymap={top_element.keymap} />
            </div>
        </div>
    }

    keymapHook(element: NavElement) {
        const elementIndex = this.stack.findIndex(el => el === element)
        if (elementIndex === -1) {
            console.warn("Ignored careless call to keymap hook: element isn't in the stack anymore")
        } else if (elementIndex === this.stack.length - 1) {
            __setGlobalKeyMap(...element.keymap)
            this.forceUpdate()
        } else {
            console.warn("Ignored careless call to keymap hook: element is not in foreground")
        }
    }
    
    headerHook(element: NavElement) {
        const elementIndex = this.stack.findIndex(el => el === element)
        if (elementIndex === -1) {
            console.warn("Ignored careless call to change header: element isn't in the stack anymore")
        } else if (elementIndex === this.stack.length - 1) {
            __setGlobalKeyMap(...element.keymap)
            this.forceUpdate()
        } else {
            console.warn("Ignored careless call to change header: element is not in foreground")
        }
    }

    createNavElement(screen_id: string, initData: { [key: string]: any }) {
        return new NavElement(
            getScreen(screen_id),
            this.keymapHook,
            this.headerHook,
            initData
        )
    }

    pushScreen(screen_id: string, initData: { [key: string]: any }) {
        console.debug('[nav] pushScreen', screen_id, initData)
        this.stack.push(this.createNavElement(screen_id, initData))
        this.forceUpdate() // trigger rerender
    }

    setRootScreen(screen_id: string, initData: { [key: string]: any }) {
        console.debug('[nav] setRootScreen', screen_id, initData)
        this.stack = [this.createNavElement(screen_id, initData)]
        this.forceUpdate() // trigger rerender
    }

    closeScreen(element: NavElement) {
        console.debug('[nav] closeScreen', element)
        this.stack.filter(el => el !== element)
        this.forceUpdate() // trigger rerender
    }

}


render(<div id="app"><Nav /></div>, document.body)

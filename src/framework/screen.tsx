import { h, Component } from 'preact';
import { KeyBinding, Key } from './keymanager';
import { SoftwareKeys } from './softwareButtonBar';
import { Header } from './header';

interface RawScreenProps {
    ctrl: {
        screen: {
            setKeyMap: typeof NavElement.prototype.setKeyMap
            setHeader: typeof NavElement.prototype.setHeader
            setTransparency: typeof NavElement.prototype.setTransparency
        },
        nav: {
            pushScreen: typeof Nav.prototype.pushScreen
            setRootScreen: typeof Nav.prototype.setRootScreen
            closeScreen: () => void
        }
    },
    data: { [key: string]: any }
}

export type ScreenProps = RawScreenProps & Readonly<import("preact").Attributes & { children?: import("preact").ComponentChildren; ref?: import("preact").Ref<any>; }>

// screen/nav controller
class NavElement {
    screen_functions: {}
    public keymap: KeyBinding[]
    public header: string | h.JSX.Element
    public transparent: boolean = false
    constructor(
        public screen: (props: any) => h.JSX.Element,
        public initData: { [key: string]: any }
    ) {
        this.screen_functions = {
            setKeyMap: this.setKeyMap.bind(this),
            setHeader: this.setHeader.bind(this),
            setTransparency: this.setTransparency.bind(this)
        }
    }

    setKeyMap(...keymap: KeyBinding[]) {
        this.keymap = keymap
    }

    setHeader(header: string | h.JSX.Element) {
        this.header = header
    }

    setTransparency(transparent:boolean){
        this.transparent = transparent
    }
}

function getTopElement<T>(stack:T[]):T{
    return stack.length > 0 && stack[stack.length - 1]
}

export class Nav extends Component<{
    resolveScreenId:(screen_id: string) => ((props: any) => h.JSX.Element)
}, any> {
    stack: NavElement[] = []

    render(): import("preact").ComponentChild {
        const top_element = getTopElement(this.stack)
        return <div class="screen-wrapper">
            <Header>{top_element?.header}</Header>
            <div class="content">
                {
                    this.stack.map((element, index) => {
                        const nav_functions = {
                            pushScreen: this.pushScreen.bind(this),
                            setRootScreen: this.setRootScreen.bind(this),
                            closeScreen: () => this.closeScreen(element)
                        }
                        return <div class='nav-element' style={{
                            "z-index": index, "background-color": element.transparent ? 'transparent' : 'white'
                        }}>
                            <element.screen
                                ctrl={{
                                    nav: nav_functions,
                                    screen: element.screen_functions,
                                }}
                                data={element.initData}
                            />
                        </div>
                    })
                }
            </div>
            <SoftwareKeys keymap={top_element.keymap} />
        </div>
    }
    
    createNavElement(screen_id: string, initData: { [key: string]: any }) {
        return new NavElement(
            this.props.resolveScreenId(screen_id),
            initData
        )
    }

    pushScreen(screen_id: string, initData?: { [key: string]: any }) {
        console.debug('[nav] pushScreen', screen_id, initData)
        this.stack.push(this.createNavElement(screen_id, initData))
        this.forceUpdate() // trigger rerender
    }

    setRootScreen(screen_id: string, initData?: { [key: string]: any }) {
        console.debug('[nav] setRootScreen', screen_id, initData)
        this.stack = [this.createNavElement(screen_id, initData)]
        this.forceUpdate() // trigger rerender
    }

    closeScreen(element: NavElement) {
        console.debug('[nav] closeScreen', element)
        this.stack = this.stack.filter(el => el !== element)
        this.forceUpdate() // trigger rerender
    }

    // Key Handling
    handleKey(ev:KeyboardEvent){
        console.debug("Key pressed", ev)
        const KeyMap = getTopElement(this.stack)?.keymap || []
        KeyMap.find(({ key }) => ev.key === key)?._runCallback(ev)
        if((ev.key === Key.BACKSPACE || ev.key === Key.HELP) && KeyMap.find(({ key }) => ev.key === key)){
            // Prevents app from exiting when pressing back and an action is defined
            ev.preventDefault()
            ev.stopImmediatePropagation()
        }
    }
    keyHandleFuntion:any;
    componentWillMount(){
        this.keyHandleFuntion = this.handleKey.bind(this)
        document.addEventListener('keydown', this.keyHandleFuntion)
    }
    componentWillUnmount(){
        document.removeEventListener('keydown', this.keyHandleFuntion)
    }

}
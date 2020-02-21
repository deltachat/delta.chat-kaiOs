import { h, Component } from 'preact';
import { Key } from '../keymanager';
import { SoftwareKeys } from './components/softwareButtonBar';
import { Header } from './components/header';
import { NavElement } from './navElement';


function getTopElement<T>(stack:T[]):T{
    return stack.length > 0 && stack[stack.length - 1]
}

export class Router extends Component<{
    resolveScreenId:(screen_id: string) => ((props: any) => h.JSX.Element)
}, any> {
    stack: NavElement[] = []

    render(): import("preact").ComponentChild {
        const top_element = getTopElement(this.stack)
        return <div class="screen-wrapper">
            <Header>{top_element?.header}</Header>
            <div class="router-content">
                {
                    this.stack.map((element, index) => element.renderFunction(index))
                }
            </div>
            <SoftwareKeys keymap={top_element.keymap} />
        </div>
    }
    
    createNavElement(screen_id: string, initData: { [key: string]: any }) {
        return new NavElement(
            this.props.resolveScreenId(screen_id),
            initData,
            this
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
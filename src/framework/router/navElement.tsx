import { createContext } from 'preact'
import { KeyBinding } from '../keymanager'
import { Router } from './router'
import type { h} from 'preact'

type NavElementContextType = {
  nav: NavRemote
  setKeyMap: typeof NavElement.prototype.setKeyMap
  setHeader: typeof NavElement.prototype.setHeader
  setTransparency: typeof NavElement.prototype.setTransparency
  initData: { [key: string]: any }
}

export const NavElementContext = createContext<NavElementContextType|null>(null)

export class NavElement {
  public keymap: KeyBinding[] = []
  public header: string | h.JSX.Element | undefined
  public transparent: boolean = false
  context: NavElementContextType
  constructor(
    public screen: (props: any) => h.JSX.Element,
    initData: { [key: string]: any },
    private router: Router
  ) {
    this.context = {
      nav: new NavRemote(router, this),
      setKeyMap: this.setKeyMap.bind(this),
      setHeader: this.setHeader.bind(this),
      setTransparency: this.setTransparency.bind(this),
      initData,
    }
  }

  /**
   * Warning: this will make a loop if you don't use it in a use effect
   * @param keymap
   */
  setKeyMap(...keymap: KeyBinding[]) {
    this.keymap = keymap
    this.router.setState({ uKeymap: Math.random() })
  }

  setHeader(header: string | h.JSX.Element | undefined) {
    if (this.header !== header) {
      this.header = header
      this.router.setState({ uHeader: Math.random() })
    }
  }

  setTransparency(transparent: boolean) {
    if (this.transparent !== transparent) {
      this.transparent = transparent
      this.router.setState({ uContent: Math.random() })
    }
  }

  renderFunction(index: number) {
    return (
      <div
        class='nav-element'
        style={{
          zIndex: index,
          backgroundColor: this.transparent ? 'transparent' : 'white',
        }}
        key={'screen-' + index}
      >
        <NavElementContext.Provider value={this.context}>
          <this.screen />
        </NavElementContext.Provider>
      </div>
    )
  }
}

export class NavRemote {
  setRoot: typeof Router.prototype.setRootScreen
  push: typeof Router.prototype.pushScreen
  /** closes the current screen */
  closeCurrent: () => void
  constructor(private router: Router, private element: NavElement) {
    this.setRoot = router.setRootScreen.bind(router)
    this.push = router.pushScreen.bind(router)
    this.closeCurrent = this.router.closeScreen.bind(router, this.element)
  }
}

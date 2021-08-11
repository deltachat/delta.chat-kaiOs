import { render } from 'preact'
import { useRef, useEffect } from 'preact/hooks'
import { ChatListView } from './views/chatListView'
import { Router } from './framework/router'

import './styles/main.scss'

function App(props: any) {
  const navRef = useRef<Router>()

  useEffect(() => {
    navRef.current?.setRootScreen(ChatListView)
  })

  return (
    <div id='app'>
      <Router ref={navRef} />
    </div>
  )
}

render(<App />, document.getElementById('app')!)

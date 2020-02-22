import { h, render } from 'preact'
import { useRef, useEffect } from 'preact/hooks'
import { ChatListView } from './views/chatListView'
import { Router } from './framework/router'

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

render(<App />, document.body)

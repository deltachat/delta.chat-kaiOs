import { h, render } from 'preact';
import { useRef, useEffect } from 'preact/hooks'
import { ChatListView } from './views/chatListView';
import { ChatView } from './views/chatView';
import { AboutView } from './views/aboutView'
import { Router } from './framework/router';

function resolveScreenId(screen_id: string) {
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

function App(props:any) {
    const navRef = useRef<Router>()

    useEffect(() => {
        navRef.current?.setRootScreen('chatList')
    })

    return <div id="app">
        <Router ref={navRef} resolveScreenId={resolveScreenId}/>
    </div>
}

render(<App/>, document.body)

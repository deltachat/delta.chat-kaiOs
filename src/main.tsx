import { h, render, Component } from 'preact';
import { useState } from 'preact/hooks'
import { ChatListView } from './components/chatList';
import { context } from './manager';



function getScreen(screen_id: string) {
    switch (screen_id) {
        case "chatList":
            return ChatListView
        default:
            return () => <p>Loading</p>
    }
}

function App(props) {
    console.log('hi')
    const [screen_id, setScreen] = useState('chatList')
    console.log(screen_id)
    const Screen = getScreen(screen_id)
    return <Screen context={context}></Screen>
}


render(<div id="app"><App /></div>, document.body)

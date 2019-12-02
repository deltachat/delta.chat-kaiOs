import { h, render, Component } from 'preact';
import { useState } from 'preact/hooks'
import { ChatListView } from './components/chatListView';
import { context } from './manager';
import { setKeyMap } from './keymanager';
import { ChatView } from './components/chatView';

function getScreen(screen_id: string) {
    switch (screen_id) {
        case "chatList":
            return ChatListView
        case "chat":
            return ChatView
        default:
            return () => <p>Loading</p>
    }
}

function App(props: any) {
    const [screen_id, setScreen] = useState('chatList')
    const [data, setData] = useState({})
    console.log(screen_id, data)
    setKeyMap() //clear keymap before switching screen
    const Screen = getScreen(screen_id)

    const goto = (screenId: string, data: any) => {
        console.log(data, screenId)
        setScreen(screenId)
        setData(data)
    }

    return <Screen context={context} goto={goto} data={data}></Screen>
}


render(<div id="app"><App /></div>, document.body)

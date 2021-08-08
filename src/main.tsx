import { render } from 'preact'
import { useRef, useEffect } from 'preact/hooks'
import { ChatListView } from './views/chatListView'
import { ConnectView } from './views/connectView'
import { LoginView } from './views/loginView'
import { Router } from './framework/router'

import './styles/main.scss'

import {dc_core} from "./manager";

function App(props: any) {
  const navRef = useRef<Router>()

  useEffect(() => {
    const setRoot = async () => {
      // TODO check and don't swith if already on the right screen
      if(dc_core.isConnectedToBackend()){
        if (!await dc_core.raw_api.get_selected_account_id()) {
          console.log("No Account, creating one");
          const id = await dc_core.raw_api.add_account();
          await dc_core.raw_api.select_account(id)
          console.log("created Account id:", id);
        }
        if(await dc_core.raw_api.sc_is_configured()){
          navRef.current?.setRootScreen(ChatListView)
        } else {
          navRef.current?.setRootScreen(LoginView)
        }
      } else {
        navRef.current?.setRootScreen(ConnectView)
      }
    }

    dc_core.addListener("socket_connection_change", setRoot)
    return () => {
      dc_core.removeListener("socket_connection_change", setRoot)
    }
  })

  useEffect(()=>{navRef.current?.setRootScreen(ConnectView)},[])

  return (
    <div id='app'>
      <Router ref={navRef} />
    </div>
  )
}

render(<App />, document.getElementById('app')!)

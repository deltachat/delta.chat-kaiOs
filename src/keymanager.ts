type Key = 
    'Enter' // alias to CSK?
    |'Backspace'
    |'SoftLeft'
    |'SoftRight' // does this exist?
    |'ArrowDown'
    |'ArrowUp'
// TODO add the other possible options


export class KeyBinding {
    constructor(
        public key: Key,
        private cb: (ev: KeyboardEvent) => void,
    ) { }

    _runCallback(ev: KeyboardEvent) {
        this.cb(ev)
    }
}

var KeyMap: KeyBinding[] = [];

export function setKeyMap(...newKeyMap: KeyBinding[]) {
    KeyMap = newKeyMap
}

document.addEventListener('keydown', ev => {
    console.debug("Key pressed", ev)
    KeyMap.find(({ key }) => ev.key === key)?._runCallback(ev)
});
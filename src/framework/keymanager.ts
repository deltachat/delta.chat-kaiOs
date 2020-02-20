import { h } from "preact";

export const enum Key {
    // For development on desktop
    ENTER = 'Enter',
    BACKSPACE = 'Backspace',
    ESCAPE = 'Escape',
    F1 = "F1",

    // Kai OS
    LSK = 'SoftLeft',
    CSK = 'Enter',
    RSK = 'SoftRight',
    
    BACK_CLEAR = 'Backspace',

    UP = 'ArrowUp',
    DOWN = 'ArrowDown',
    LEFT = 'ArrowLeft',
    RIGHT = 'ArrowRight',

    HELP = 'Help',

    // todo Call key?
    // todo End key?

    NUM_1 = '1',
    NUM_2 = '2',
    NUM_3 = '3',
    NUM_4 = '4',
    NUM_5 = '5',
    NUM_6 = '6',
    NUM_7 = '7',
    NUM_8 = '8',
    NUM_9 = '9',
    /** '*' '+' button */
    NUM_STAR = '*', // is this correct?
    NUM_HASHTAG = '#', // is this correct?

    // for further information about the keys you can look at https://developer.kaiostech.com/design-guide/key
    // or use sth like https://keycode.info/ on the device
}

export class KeyBinding {
    constructor(
        public key: Key,
        private cb: (ev: KeyboardEvent) => void,
        public label?: string | h.JSX.Element
    ) { }

    _runCallback(ev: KeyboardEvent) {
        this.cb(ev)
    }
}
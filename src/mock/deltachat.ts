export class Context {


    get chatList (){
        return [
            new ChatListItem(10, "Peter Johnson", null, 3, "#ffbb00"),
            new ChatListItem(11, "Tanja Reis", null, 0, "#4f0000"),
            new ChatListItem(12, "Manuel Schuhmann", null, 13, "#666066"),
            new ChatListItem(13, "Regina Miller", null, 1, "#ffbb66"),
        ]
    }

    getAllMessagesForChat (chatId:number){
        return [
            new Message(10, 'incomming', "Hello", Date.now() - 7000),
            new Message(12, 'outgoing', "Hey, how was your vacation?", Date.now() - 5000),
            new Message(13, 'incomming', "It was hot 😎", Date.now() - 4000),
            new Message(17, 'outgoing', "❤️", Date.now() - 3000),
        ]
    }

}

export class ChatListItem {

    constructor (
        public ChatId:number,
        public name:string,
        public profileImage:string,
        public unreadMessageCount:number,
        public avatarColor:string
    ){}
}


export class Message {
    constructor (
        public messageId:number,
        public direction:'incomming'|'outgoing',
        public text:string,
        public timestamp: number,
        // todo (author and so on)
    ){}
}
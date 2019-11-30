export class Context {


    get chatList (){
        return [
            new ChatListItem(10, "Peter Johnson", null, 3, "#ffbb00"),
            new ChatListItem(11, "Tanja Reis", null, 0, "#4f0000"),
            new ChatListItem(12, "Manuel Schuhmann", null, 13, "#666066"),
            new ChatListItem(13, "Regina Miller", null, 1, "#ffbb66"),
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

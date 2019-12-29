export class Context {


    get chatList (){
        return [
            new ChatListItem(10, "Peter Johnson", null, 3, "#ffbb00"),
            new ChatListItem(11, "Tanja Reis", null, 0, "#4f0000"),
            new ChatListItem(12, "Manuel Schuhmann", null, 13, "#666066"),
            new ChatListItem(13, "Regina Miller", null, 1, "#ffbb66"),
            new ChatListItem(14, "Sample group", null, 0, "#f1a866"),
        ]
    }

    getAllMessagesForChat (chatId:number){
        if(chatId == 14) {
            return [
                new Message(20, 12, "Hello", Date.now() - 8000),
                new Message(22, 1, "Hey", Date.now() - 7000),
                new Message(23, 10, "welcome to our group", Date.now() - 6000),
                new Message(27, 1, "thanks for creating it!", Date.now() - 3000),
            ]
        } else {
            return [
                new Message(10, 10, "Hello", Date.now() - 7000),
                new Message(12, 1, "Hey, how was your vacation?", Date.now() - 5000),
                new Message(13, 10, "It was hot 😎", Date.now() - 4000),
                new Message(17, 1, "❤️", Date.now() - 3000),
            ]
        }
    }

    getContactById(contactId:number){
        const mock_contact_db:{[key:number]:Contact} = {
            1: new Contact(1, "Me"),
            10: new Contact(1, "Me"),
            12: new Contact(1, "Me"),
        }
        return mock_contact_db[contactId]
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
        /** contact id of the author */
        public authorId:number,
        public text:string,
        public timestamp: number,
        // todo (author and so on)
    ){}

    isOutgoing(){
        return this.authorId === 1
    }

    isIncomming(){
        return this.authorId !== 1
    }
}



export class Contact {
    constructor (
        public contactId:number,
        public displayName:string,
        // todo - add missing properties
    ){}
}
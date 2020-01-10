export class Context {


    getChatName(chatId:number) {
        return this.chatList.find(cli => cli.ChatId === chatId).name
    }

    get chatList() {
        return [
            new ChatListItem(
                10,
                "Peter Johnson",
                null,
                "#ffbb00",
                0,
                Date.now() - 2900,
                {
                    text1: "Me:",
                    text2: "thanks for creating it!",
                    status: MessageStatus.PENDING
                },
                false
            ),
            new ChatListItem(
                11,
                "Tanja Reis",
                null,
                "#4f0000",
                1,
                Date.now() - 4344325,
                {
                    text1: "Me:",
                    text2: "Jo",
                    status: MessageStatus.READ
                },
                false
            ),
            new ChatListItem(
                12,
                "Manuel Schuhmann",
                null,
                "#666066",
                0,
                Date.now() - 45395439,
                {
                    text1: "",
                    text2: "Klettern im park morgen ist um 15 uhr, biste dabei?",
                    status: null
                },
                false
            ),
            new ChatListItem(
                13,
                "Regina Miller",
                null,
                "#ffbb66",
                1,
                Date.now() - 2900,
                {
                    text1: "",
                    text2: "Jo",
                    status: null
                },
                false
            ),
            new ChatListItem(
                14,
                "Sample group",
                null,
                "#f1a866",
                0,
                Date.now() - 342412,
                {
                    text1: "Me:",
                    text2: "Genau!",
                    status: null
                },
                true
            ),
            new ChatListItem(
                15,
                "Gierberger Golfclub",
                "img/golf.png",
                "#f1a866",
                72,
                Date.now() - 37000,
                {
                    text1: "Tanja:",
                    text2: "Ich hab meinen schläger verloren 😭",
                    status: null
                },
                false
            ),
        ]
    }

    getAllMessagesForChat(chatId: number) {
        if (chatId == 14) {
            return [
                new Message(20, 12, "Hello", Date.now() - 8000, MessageStatus.DELIVERED),
                new Message(22, 1, "Hey", Date.now() - 7000, MessageStatus.READ),
                new Message(23, 10, "welcome to our group", Date.now() - 6000, MessageStatus.DELIVERED),
                new Message(27, 1, "thanks for creating it!", Date.now() - 3000, MessageStatus.PENDING),
            ]
        } else {
            return [
                new Message(10, 10, "Hello", Date.now() - 7000, MessageStatus.DELIVERED),
                new Message(12, 1, "Hey, how was your vacation?", Date.now() - 5000, MessageStatus.READ),
                new Message(13, 10, "It was hot 😎", Date.now() - 4000, MessageStatus.DELIVERED),
                new Message(17, 1, "❤️", Date.now() - 3000, MessageStatus.DELIVERED),
                new Message(17, 1, "jo", Date.now() - 2900, MessageStatus.ERROR),
            ]
        }
    }

    getContactById(contactId: number) {
        const mock_contact_db: { [key: number]: Contact } = {
            1: new Contact(1, "Me", true),
            10: new Contact(10, "Felix", false),
            12: new Contact(12, "Andrea", true),
            14: new Contact(14, "Alex", false),
        }
        return mock_contact_db[contactId]
    }

}

let chat_count = 10

export enum ChatType {
    Single,
    Group,
    VerifiedGroup
}

export class Chat {
    constructor(
        public type: ChatType,
        private group_name: string | undefined,
        public contacts: string,
        //todo rest
    ) {
    }
}

export enum chatListItemType {
    RealChat,
    /** deaddrop aka. Contact Request */
    DeadDrop,
    /** fake chat that should get rendered as a link to get the chatlist for archived chats */
    ArchiveLink,
}

/** information about the last message that was sent to a chat */
interface chatListItemSummary {
    text1: string,
    text2: string,
    /** null when other party send it */
    status: MessageStatus | null
}

export class ChatListItem {

    constructor(
        public ChatId: number,
        public name: string,
        public avatarImage: string,
        public avatarColor: string,
        public freshMessageCount: number,
        public lastUpdatedTimestamp: number,
        public summary: chatListItemSummary,
        public verified: boolean,
        public type: chatListItemType = chatListItemType.RealChat
    ) { }
}

export enum MessageStatus {
    UNKNOWN,
    /** pending = currently sending */
    PENDING,
    DELIVERED,
    READ,
    ERROR,
}


export class Message {
    constructor(
        public messageId: number,
        /** contact id of the author */
        public authorId: number,
        public text: string,
        public timestamp: number,
        public status: MessageStatus,
        // todo (misiing values)
    ) { }

    isOutgoing() {
        return this.authorId === 1
    }

    isIncomming() {
        return this.authorId !== 1
    }
}



export class Contact {
    constructor(
        public contactId: number,
        public displayName: string,
        public isVerified: boolean,
        // todo - add missing properties
    ) { }
}
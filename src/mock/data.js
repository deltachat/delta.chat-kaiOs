"use strict";

let data_chat_list = [

    {
        chatId: 1,
        name: "Leaf Silberstein",
        profileImage: "",
        unreadMessageCount: 1,
        avatarColor: "#ffbb00"
    },
    { chatId: 5, name: "Mathilda Gort", profileImage: "", unreadMessageCount: "", avatarColor: "#ffbb00" },
    { chatId: 7, name: "Vanna Loyk", profileImage: "", unreadMessageCount: "", avatarColor: "#ffbb00" },
    { chatId: 4, name: "Peter Petersen", profileImage: "", unreadMessageCount: 3, avatarColor: "#ffbb00" },
    { chatId: 11, name: "Nina", profileImage: "", unreadMessageCount: 3, avatarColor: "#ffbb00" },
    { chatId: 14, name: "Ivan Walska", profileImage: "", unreadMessageCount: 3, avatarColor: "#ffbb00" },
    { chatId: 8, name: "Garry Niklas", profileImage: "", unreadMessageCount: 17, avatarColor: "#ffbb00" }
];


let chat_feed = [

    { chatId: 7, messageId: 13, direction: 'incoming', text: 'hey wie gehts ?', timestamp: Date.now() - 7000 },
    { chatId: 7, messageId: 17, direction: 'outgoing', text: 'gut, danke', timestamp: Date.now() - 7000 },
    //////
    { chatId: 5, messageId: 13, direction: 'incoming', text: 'Klettern ?', timestamp: Date.now() - 7000 },
    { chatId: 5, messageId: 17, direction: 'outgoing', text: 'ja! Wohin?', timestamp: Date.now() - 7000 },
    { chatId: 5, messageId: 17, direction: 'incoming', text: 'Falkenwand ?', timestamp: Date.now() - 7200 },
    { chatId: 5, messageId: 17, direction: 'outgoing', text: 'Okay, öv + velo', timestamp: Date.now() - 7000 },
    ////
    { chatId: 8, messageId: 13, direction: 'incoming', text: 'Klettern ?', timestamp: Date.now() - 7000 },
    { chatId: 8, messageId: 17, direction: 'outgoing', text: 'ja! Wohin?', timestamp: Date.now() - 7000 },
    { chatId: 8, messageId: 17, direction: 'incoming', text: 'Falkenwand ?', timestamp: Date.now() - 7200 },
    { chatId: 8, messageId: 17, direction: 'outgoing', text: 'Okay, öv + velo', timestamp: Date.now() - 7000 }

]
"use strict";

let data_chat_list = [{ id: 1, name: "Leaf Silberstein", profileImage: "", unreadMessageCount: 1, avatarColor: "#ffbb00" },
    { chatId: 5, name: "Mathilda Gort", profileImage: "", unreadMessageCount: "", avatarColor: "#ffbb00" },
    { chatId: 7, name: "Vanna Loyk", profileImage: "", unreadMessageCount: "", avatarColor: "#ffbb00" },
    { chatId: 4, name: "Peter Petersen", profileImage: "", unreadMessageCount: 3, avatarColor: "#ffbb00" },
    { chatId: 11, name: "Nina", profileImage: "", unreadMessageCount: 3, avatarColor: "#ffbb00" },
    { catId: 14, name: "Ivan Walska", profileImage: "", unreadMessageCount: 3, avatarColor: "#ffbb00" },
    { chatId: 8, name: "Garry Niklas", profileImage: "", unreadMessageCount: 17, avatarColor: "#ffbb00" }
];


let chat_feed = [

    { messageId: 13, direction: 'incoming', text: 'test text', timestamp: Date.now() - 7000 },
    { messageId: 17, direction: 'outgoing', text: 'test', timestamp: Date.now() - 7000 }


]


//filter by chatId
//example
/*
var heroes = [
	{name: “Batman”, franchise: “DC”},
	{name: “Ironman”, franchise: “Marvel”},
	{name: “Thor”, franchise: “Marvel”},
	{name: “Superman”, franchise: “DC”}
];

var marvelHeroes =  heroes.filter(function(hero) {
	return hero.franchise == “Marvel”;
});
*/
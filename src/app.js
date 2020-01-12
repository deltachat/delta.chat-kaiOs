"use strict";
    let state;


setTimeout(function() {
    state = "chat-list";
    showChatList("show")
    document.getElementById('intro').style.display = 'none';
}, 2000);





//////////////////////////
////NAV////////////
/////////////////////////


function nav(param) {

    let focused =  document.activeElement.tabIndex;
    let siblingsLength = document.activeElement.parentNode.children.length - 1;
    let siblings = document.activeElement.parentNode.children;


    if (param == "down" && focused < siblingsLength) {
        focused++
        siblings[focused].focus();

    }

    if (param == "up" && focused > 0) {
        focused--
        siblings[focused].focus();
    }

    if (param == "right" && focused < siblingsLength) {
        focused++
        siblings[focused].focus();
    }

    if (param == "left" && focused > 0) {
        focused--
        siblings[focused].focus();
    }

}


function button_bar(left, center, right) {
    document.getElementById("button-left").innerHTML = left;
    document.getElementById("button-center").innerHTML = center;
    document.getElementById("button-right").innerHTML = right;
}

function loadChatData(chatIdFilter) {
    chat_feed.forEach(function(item, index) {
        if (item.chatId == chatIdFilter) {
            let datetime = moment(item.timestamp).format("DD.MM.YYYY, HH:MM");
            let content = '<div class="message ' + item.direction + '">' +
                '<div class="inner">' +
                '<div class="text">' +
                '<div>' + item.text + '</div>' +
                '<div class="date">' + datetime + '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
            document.getElementById('chat-messages').insertAdjacentHTML('beforeend', content);
        }
    });
}




function showChat(showhidde) {


    if (showhidde == "show") {
        document.getElementById('chat-messages').innerHTML = '';
        loadChatData(document.activeElement.getAttribute('data-id'))

        document.getElementById("chat-list").style.display = 'none';
        document.getElementById("chat").style.display = 'block';
        setTabindex("chat-messages", "div.message")

        //items = document.querySelectorAll('div#chat-messages div.message');
        toaster(items.length)
        if (items.length > 0) {
            let last_item = items.length - 1;
            items[last_item].focus();

        }




        button_bar('<img src="icons/arrow-left.svg"/>', '', '<img src="icons/envelope.svg"/>')

        state = "chat";

    }
    if (showhidde == "hidde") {
        document.querySelector("div#chat").style.display = "none";
    }

}


function showChatList(showhidde) {
    if (showhidde == "show") {
        document.getElementById("chat-list").innerHTML = "";
        for (let i = 0; i < data_chat_list.length; i++) {
            let user = '<li class="user-name flex">' + data_chat_list[i].name + '</li><li class="unread-messages">' + data_chat_list[i].unreadMessageCount + '</li>';
            document.querySelector("div#chat-list").insertAdjacentHTML('beforeend', '<ul class="user-item flex justify-content-spacebetween" data-id="' + data_chat_list[i].chatId + '"  >' + user + '</ul>');
        }


        document.querySelector("div#chat-list").style.display = "block";
        setTabindex("chat-list", "ul.user-item")
        items[0].focus();

        button_bar('', 'select', '')



        state = "chat-list"
    }
    if (showhidde == "hidde") {
        document.querySelector("div#chat-list").style.display = "none";
    }
}



function showAttachments(showhidde) {
    if (showhidde == "show") {
        document.getElementById("chat-attachments").style.display = "block";
        document.querySelector("div#chat div#chat-attachments div#inner div:first-child").focus()




        button_bar('<img src="icons/arrow-left.svg"/>', 'select', '')


        setTabindex("inner", "div")
        items = document.querySelectorAll('div#chat-attachments div#inner div');
        let last_item = items.length - 1
        items[last_item].focus();
        state = "attachment";
    }
    if (showhidde == "hidde") {
        document.querySelector("div#chat div#chat-attachments").style.display = "none";
        document.querySelector("div#chat div#chat-input textarea").focus();

        button_bar('<img src="icons/arrow-left.svg"/>', '<img src="icons/paperclip.svg"/>', '<img src="icons/envelope.svg"/>')


        state = "chat-input";

    }
}


function showChatInput(showhidde) {
    if (showhidde == "show") {
        document.querySelector("div#chat div#chat-input").style.display = "block";
        document.querySelector("div#chat div#chat-input textarea").focus();


        button_bar('<img src="icons/arrow-left.svg"/>', '<img src="icons/paperclip.svg"/>', '<img src="icons/envelope.svg"/>')


        state = "chat-input";

    }
    if (showhidde == "hidde") {
        document.querySelector("div#chat div#chat-input").style.display = "none";

        button_bar('<img src="icons/arrow-left.svg"/>', '', '<img src="icons/edit.svg"/>')

        state = "chat";
    }
}


//////////////////////////
////KEYPAD TRIGGER////////////
/////////////////////////



let longpress;

function longpress_func() {

    clearTimeout(longpress);
}




function handleKeyDown(evt) {

    switch (evt.key) {

        case 'Enter':
            longpress = setTimeout(longpress_func, 1500)

            if (state == "chat-list") {
                showChat("show");
                return false;
            }
            if (state == "chat-input") {
                evt.preventDefault();
                showChatInput("hidde")
                showAttachments("show")
                return false;
            }
            break;


        case 'ArrowDown':
            nav("down");
            break;


        case 'ArrowUp':
            nav("up");
            break;


        case 'ArrowLeft':
            nav("left");
            break;

        case 'ArrowRight':
            nav("right");
            break;


        case '1':
        case 'SoftLeft':
            if (state == "chat") {
                showChatList("show");
                showChat("hidde");
                return false;
            }

            if (state == "chat-input") {
                showChatInput("hidde");
                showChat("show");
                return false;
            }

            if (state == "attachment") {
                showAttachments("hidde");
                showChatInput("show");
                return false;
            }

            break;


        case '2':
        case 'SoftRight':
            if (state = "chat-input") {
                showChatInput("show");
                return false;
            }

            break;


        case 'Backspace':
            evt.preventDefault();



            if (state = "chat-list") {
                window.close();
            }
            break;








    }

};








function handleKeyUp(evt) {

    switch (evt.key) {

        case 'Enter':
            clearTimeout(longpress);
            break;
    }

};




document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
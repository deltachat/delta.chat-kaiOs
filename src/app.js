$(document).ready(function() {

    setTabindex("div#chat-list", "ul.user-item")
    $(items[0]).focus();

    let state = "chat-list";




    //////////////////////////
    ////NAV////////////
    /////////////////////////

    let $focused = $(':focus').attr("tabindex");

    function nav(param) {

        let tagname = ($(':focus').prop('tagName'));
        let focused = $(':focus').attr("tabindex");
        let siblingsLength = $(':focus').siblings().length

        if (param == "down" && focused < siblingsLength) {
            focused++
            $(tagname + '[tabindex=' + focused + ']').focus()

        }

        if (param == "up" && focused > 0) {
            focused--
            $('ul[tabindex=' + focused + ']').focus()

        }

        if (param == "right" && focused < siblingsLength) {
            focused++
            $('div[tabindex=' + focused + ']').focus()

        }

        if (param == "left" && focused > 0) {
            focused--
            $('div[tabindex=' + focused + ']').focus()

        }

    }

    let scroll_step = 1;

    function chat_messages_scroll(dir) {
        if ($("div#chat").is(':visible')) {
            if (dir == "down") {
                $('div#chat-messages').scrollTop(scroll_step += 15)
            }

            if (dir == "up") {
                $('div#chat-messages').scrollTop(scroll_step -= 15)
            }
        }
    }


    function showChat(showhidde) {


        if (showhidde == "show") {
            $("div#chat-list").css("display", "none");
            $("div#chat").css("display", "block");
            $('div#chat-messages').scrollTop(5000);
            state = "chat";
        }
        if (showhidde == "hidde") {
            $("div#chat").css("display", "none");
        }

    }


    function showChatList(showhidde) {
        if (showhidde == "show") {
            $("div#chat-list").css("display", "block");
            $(items[0]).focus();
            state = "chat-list"
        }
        if (showhidde == "hidde") {
            $("div#chat-list").css("display", "none");
        }
    }



    function showAttachments(showhidde) {
        if (showhidde == "show") {
            $("div#chat div#chat-attachments").css("display", "block")
            $("div#chat div#chat-attachments div.inner div:first-child").focus()
            $("div#chat div#bottom-bar div#button-left").text("cancel");
            $("div#chat div#bottom-bar div#button-center").text("select");
            $("div#chat div#bottom-bar div#button-right").text("");
            state = "attachment"
        }
        if (showhidde == "hidde") {
            $("div#chat div#chat-attachments").css("display", "none");
            $("div#chat div#chat-input textarea").focus();
            $("div#chat div#bottom-bar div#button-left").text("abort");
            $("div#chat div#bottom-bar div#button-center").text("attachment");
            $("div#chat div#bottom-bar div#button-right").text("send");
            state = "chat-input";
        }
    }


    function showChatInput(showhidde) {
        if (showhidde == "show") {
            $("div#chat div#chat-input").css("display", "block");
            $("div#chat div#chat-input textarea").focus();

            $("div#chat div#bottom-bar div#button-left").text("abort");
            $("div#chat div#bottom-bar div#button-center").text("attachment");
            $("div#chat div#bottom-bar div#button-right").text("send");
            state = "chat-input";

        }
        if (showhidde == "hidde") {
            $("div#chat div#chat-input").css("display", "none");
            $("div#chat div#bottom-bar div#button-left").text("back");
            $("div#chat div#bottom-bar div#button-center").text("");
            $("div#chat div#bottom-bar div#button-right").text("write");
            state = "chat";
        }
    }


    //////////////////////////
    ////KEYPAD TRIGGER////////////
    /////////////////////////



    let longpress;

    function longpress_func() {
        showAttachments("show")
        clearTimeout(longpress);
    }




    function handleKeyDown(evt) {

        switch (evt.key) {

            case 'Enter':
                toaster(state);
                if (state == "chat-list") {
                    showChat("show");
                    return false;
                }
                if (state == "chat-input") {
                    evt.preventDefault();
                    longpress = setTimeout(longpress_func, 1500)
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

            case 'SoftLeft':
                toaster(state);
                if (state == "chat") {
                    showChatList("show");
                    showChat("hidde");
                    return false;
                }

                if (state == "chat-input") {
                    showChatInput("hidde");
                    return false;
                }

                if (state == "attachment") {
                    showAttachments("hidde");
                    return false;
                }

                break;

            case 'SoftRight':
                toaster(state);
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

            case '2':

                break;

            case '1':

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

})
$(document).ready(function() {



    let state = "chat-list";
    showChatList("show")




    //////////////////////////
    ////NAV////////////
    /////////////////////////


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
            $(tagname + '[tabindex=' + focused + ']').focus()

        }

        if (param == "right" && focused < siblingsLength) {
            focused++
            $(tagname + '[tabindex=' + focused + ']').focus()


        }

        if (param == "left" && focused > 0) {
            focused--
            $(tagname + '[tabindex=' + focused + ']').focus()


        }

    }




    function showChat(showhidde) {


        if (showhidde == "show") {
            $("div#chat-list").css("display", "none");
            $("div#chat").css("display", "block");
            setTabindex("div#chat-messages", "div.message")
            items = $('div#chat-messages div.message');
            let last_item = items.length - 1
            $(items[last_item]).focus();
            state = "chat";

        }
        if (showhidde == "hidde") {
            $("div#chat").css("display", "none");
        }

    }


    function showChatList(showhidde) {
        if (showhidde == "show") {
            $("div#chat-list").css("display", "block");
            setTabindex("div#chat-list", "ul.user-item")
            items = $('div#chat-list ul.user-item');
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
            $("div#chat div#bottom-bar div#button-left").html('<img src="icons/arrow-left.svg"/>');
            $("div#chat div#bottom-bar div#button-center").html('');
            $("div#chat div#bottom-bar div#button-right").html('');
            setTabindex("div#chat-attachments div.inner", "div")
            items = $('div#chat-attachments div.inner div');
            let last_item = items.length - 1
            $(items[last_item]).focus();
            state = "attachment";
        }
        if (showhidde == "hidde") {
            $("div#chat div#chat-attachments").css("display", "none");
            $("div#chat div#chat-input textarea").focus();
            $("div#chat div#bottom-bar div#button-left").html('<img src="icons/arrow-left.svg"/>');
            $("div#chat div#bottom-bar div#button-center").html('<img src="icons/paperclip.svg"/>');
            $("div#chat div#bottom-bar div#button-right").html('<img src="icons/envelope.svg"/>');
            state = "chat-input";

        }
    }


    function showChatInput(showhidde) {
        if (showhidde == "show") {
            $("div#chat div#chat-input").css("display", "block");
            $("div#chat div#chat-input textarea").focus();

            $("div#chat div#bottom-bar div#button-left").html('<img src="icons/arrow-left.svg"/>');
            $("div#chat div#bottom-bar div#button-center").html('<img src="icons/paperclip.svg"/>');
            $("div#chat div#bottom-bar div#button-right").html('<img src="icons/envelope.svg"/>');
            state = "chat-input";

        }
        if (showhidde == "hidde") {
            $("div#chat div#chat-input").css("display", "none");
            $("div#chat div#bottom-bar div#button-left").html('<img src="icons/arrow-left.svg"/>');
            $("div#chat div#bottom-bar div#button-center").html('');
            $("div#chat div#bottom-bar div#button-right").html('<img src="icons/edit.svg"/>');
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

            case '2':

                if (state = "chat-input") {
                    showChatInput("show");
                    return false;
                }

                break;

            case '1':
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
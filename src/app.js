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
            $(tagname + '[tabindex=' + focused + ']').focus()

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




    function showChat(showhidde) {


        if (showhidde == "show") {
            $("div#chat-list").css("display", "none");
            $("div#chat").css("display", "block");
            setTabindex("div#chat-messages", "div.message")
            items = $('div#chat-messages div.message');
            let last_item = items.length - 1
            $(items[last_item]).focus();
            toaster("hey");
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
            $("div#chat div#bottom-bar div#button-right").text("🖉");
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
                if (state == "chat-list") {
                    showChat("show");
                    return false;
                }
                if (state == "chat-input") {
                    evt.preventDefault();
                    showAttachments("show")
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
                if (state == "chat") {
                    showChatList("show");
                    return false;
                }

                if (state == "chat-input") {
                    toaster("ho")
                    showChatInput("hidde");
                    showChat("show");
                    return false;
                }

                if (state == "attachment") {
                    showAttachments("hidde");
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
                    return false;
                }

                if (state == "chat-input") {
                    showChatInput("hidde");
                    showChat("show");
                    return false;
                }

                if (state == "attachment") {
                    showAttachments("hidde");
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
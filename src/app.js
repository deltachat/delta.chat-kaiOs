$(document).ready(function() {

    setTabindex("div#chat-list", "ul.user-item")
    $(items[0]).focus();


    function enter_in_chat() {
        $("div#chat-list").css("display", "none");
        $("div#chat").css("display", "block");
        $("div#chat div#chat-input textarea").focus();
        $('div#chat-messages').scrollTop(5000)

    }


    //////////////////////////
    ////NAV////////////
    /////////////////////////

    //to do make it more universal
    let focused = $(':focus').attr("tabindex");

    function nav(param) {


        if (param == "down" && focused < items.length) {
            focused++
            $('ul[tabindex=' + focused + ']').focus()

        }

        if (param == "up" && focused > 0) {
            focused--
            $('ul[tabindex=' + focused + ']').focus()

        }

        if (param == "right" && focused < 2) {
            focused++
            $('div[tabindex=' + focused + ']').focus()

        }

        if (param == "left" && focused > 0) {
            focused--
            $('div[tabindex=' + focused + ']').focus()

        }

    }

    let scroll_step = 0;

    function chat_messages_scroll(dir) {
        if ($("div#chat").is(':visible')) {
            if (dir == "down") {
                $('div#chat-messages').scrollTop(scroll_step += 10)
            }

            if (dir == "up") {
                $('div#chat-messages').scrollTop(scroll_step -= 10)
            }
        }
    }

    function show_chat_list() {
        if ($("div#chat").is(':visible')) {
            $("div#chat-list").css("display", "block");
            $("div#chat").css("display", "none");
            $(items[0]).focus();
        }
    }



    function showAttachments(showhidde) {
        if (showhidde == "show") {
            $("div#chat div#chat-attachments").css("display", "block")
            $("div#chat div#chat-attachments div.inner div:first-child").focus()
        }
        if (showhidde == "hidde") {
            $("div#chat div#chat-attachments").css("display", "none")
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
                enter_in_chat()
                longpress = setTimeout(longpress_func, 2000)
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
                chat_messages_scroll("down")
                break;

            case 'SoftRight':
                chat_messages_scroll("up")

                break;


            case 'Backspace':
                evt.preventDefault();
                show_chat_list();
                if ($("div#chat-list").is(':visible')) {
                    //window.close();
                }
                break;

            case '2':
                chat_messages_scroll("down")

                break;

            case '1':
                chat_messages_scroll("up")

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
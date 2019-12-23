$(document).ready(function() {

    setTabindex("div#chat-list", "ul.user-item")
    $(items[0]).focus();


    function enter_in_chat() {
        $("div#chat-list").css("display", "none");
        $("div#chat").css("display", "block");
        $("div#chat div#chat-input input").focus();
    }


    //////////////////////////
    ////NAV////////////
    /////////////////////////
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




    //////////////////////////
    ////KEYPAD TRIGGER////////////
    /////////////////////////



    function handleKeyDown(evt) {

        switch (evt.key) {

            case 'Enter':
                enter_in_chat()
                break;


            case 'ArrowDown':
                nav("down");
                break;


            case 'ArrowUp':
                nav("up");

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



    document.addEventListener('keydown', handleKeyDown);

})
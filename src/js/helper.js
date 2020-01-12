function notify(param_title, param_text, param_silent) {

    var options = {
            body: param_text,
            silent: true
        }
        // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification(param_title, options);

    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function(permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification(param_title, options);


            }
        });
    }

}

function toaster(text_string) {

    let elem = document.getElementById("toast");
    elem.innerText = text_string;

    elem.style.WebkitTransition = 'linear 1s';
    elem.style.top = "0px";


    setTimeout(function() {

        elem.style.WebkitTransition = 'linear 2s';
        elem.style.top = "-100px";

    }, 2500);



}




function screenWakeLock(param1) {
    if (param1 == "lock") {
        lock = window.navigator.requestWakeLock("screen");
    }

    if (param1 == "unlock") {
        if (lock.topic == "screen") {
            lock.unlock();
        }
    }
}






function setScreenlockPasscode(state) {


    let lock = navigator.mozSettings.createLock();
    //getting lockscreen setting value on start the app
    // to know how to set the value on the same vaule on 
    //closing the app



    if (state == "get") {
        let setting = lock.get('lockscreen.enabled');
        setting.onsuccess = function() {
            if (setting.result["lockscreen.enabled"] == false) {
                let lk_state = localStorageWriteRead("lockscreen_state", "disabled");
            }

            if (setting.result["lockscreen.enabled"] == true) {
                let lk_state = localStorageWriteRead("lockscreen_state", "enabled");
            }
        }
    }




    //set setting
    let result = lock.set({

        'lockscreen.enabled': state

    });


    result.onsuccess = function() {
        //alert("The setting has been changed");
    }

    result.onerror = function() {
        //alert("An error occure, the setting remain unchanged");
    }
}




function lockScreenDisabler() {

    let power = window.navigator.mozPower;

    screenWakeLock("lock");
    setScreenlockPasscode(false);


    function screenLockListener(topic, state) {
        $("div.setting-screenlock").css('color', 'silver').css('font-style', 'italic');
        toaster(state);
    }
    power.addWakeLockListener(screenLockListener);




}



///set tabindex
//setTabindex("div#menu","div.item");
// to do with pure javascript
// the parent element must be an id

let items = [];

function setTabindex(parent_elm, child_elm) {
    items = [];
    items = document.getElementById(parent_elm).children;

    for (let i = 0; items.length > i; i++) {
        //items.push(test[i]);

        items[i].tabIndex = i;
    };



}
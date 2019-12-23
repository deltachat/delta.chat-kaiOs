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

function toaster(text) {

    $("div#toast").text(text)
    $("div#toast").animate({ top: "0px" }, 1000, "linear", function() {


        $("div#toast").delay(2000).animate({ top: "-100px" }, 1000);


    });

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

let items = [];

function setTabindex(parent_elm, child_elm) {
    $(parent_elm + ">" + child_elm).each(function(i) {
        items.push(this);
        $(this).attr('tabindex', i);
    });

}
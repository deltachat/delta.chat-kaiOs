
$(document).ready(function() 
 {

    var socket;
        function setup()
        {
            var txtField = document.getElementById('txt')
            try 
            {
                socket = new WebSocket('ws://localhost:29031');
            } 
            catch (error) 
            {
                var p = document.createElement('p')
                p.innerText = "error" + JSON.stringify(error)
                txtField.appendChild(p)
            }
            

            socket.addEventListener('open', function (event) {
                socket.send('Hello Server!');
            });

            socket.addEventListener('error', function (event) {
                var p = document.createElement('p')
                p.innerText = "error" + JSON.stringify(event)
                txtField.appendChild(p)
            });

            // Listen for messages
            socket.addEventListener('message', function (event) {
                console.log('Message from server ', event.data);
                var p = document.createElement('p')
                p.innerText = event.data
                txtField.appendChild(p)
            });
        }


        function send(){
            var value = document.getElementById("input").value
            socket && socket.send(value)
        }


        $('input').focus()
        setup()


//////////////////////////
////KEYPAD TRIGGER////////////
/////////////////////////
function handleKeyDown(evt) 

{   

    switch (evt.key) 
    {
        case 'Enter':
          
          
            send();
        

            
            evt.preventDefault();

        break;

        case 'Backspace':

        break; 

        case 'SoftLeft':
        break; 
        
        case 'ArrowDown':
        break; 

        case 'ArrowUp':
        break; 

    }
}







    document.addEventListener('keydown', handleKeyDown);





});


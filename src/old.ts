// import * as $ from './jquery'


// $(function () {

//     var socket: WebSocket;
//     function setup() {
//         var txtField = document.getElementById('txt')
//         try {
//             socket = new WebSocket('ws://localhost:29031');
//         }
//         catch (error) {
//             var p = document.createElement('p')
//             p.innerText = "error" + JSON.stringify(error)
//             txtField.appendChild(p)
//         }

//         socket.addEventListener('open', function (event) {
//             socket.send('Hello Server!');
//         });

//         socket.addEventListener('error', function (event) {
//             var p = document.createElement('p')
//             p.innerText = "error" + JSON.stringify(event)
//             txtField.appendChild(p)
//         });

//         // Listen for messages
//         socket.addEventListener('message', function (event) {
//             console.log('Message from server ', event.data);
//             var p = document.createElement('p')
//             p.innerText = event.data
//             txtField.appendChild(p)
//         });
//     }

//     function send() {
//         const input = document.getElementById("input") as HTMLInputElement
//         var value = input.value
//         socket && socket.send(value)
//     }

//     $('input').focus()
//     setup()

//     //////////////////////////
//     ////KEYPAD TRIGGER////////////
//     /////////////////////////
//     document.addEventListener('keydown', ev => {
//         switch (ev.key) {
//             case 'Enter':
//                 send();
//                 ev.preventDefault();
//                 break;
//             case 'Backspace':
//                 break;
//             case 'SoftLeft':
//                 break;
//             case 'ArrowDown':
//                 break;
//             case 'ArrowUp':
//                 break;
//         }
//     });

// });


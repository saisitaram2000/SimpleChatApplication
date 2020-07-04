$(function(){
    //connection to server
    var socket=io.connect('http://localhost:3000');

    //inputs and buttons
    var username=$("#username");
    var message=$("#message");
    var send_username=$("#send_username");
    var send_message=$("#send_message");
    var chatroom=$("#chatroom");
    var feedback=$("#feedback");

    //send message to server
    send_message.click(function(){
        socket.emit('new_message',{message:message.val()});
        message.val('');
        feedback.html('');
    });

    //send changed username to server
    send_username.click(function(){
        socket.emit('change_username',{username:username.val()});
        username.val('');
    })


    //listen new_message from server
    socket.on('new_message',data=>{
       chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    })

    //emit typing to server
    message.bind('keypress',()=>{
        socket.emit('typing');
    })
   
    //listening typing keyword from server
    socket.on('typing',data=>{
        feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
    })

})
const express = require('express');
const app = express();

//set template engine ejs
app.set('viewengine','ejs');

//middlewares
app.use(express.static('public'));

//routes
app.get('/',(req,res) => {
    res.render('index.ejs');
 })

//listen on port 3000
server = app.listen(3000);

const io=require('socket.io')(server);

//listen on every connection
io.on('connection',socket=>{
    console.log("new user connected");

    //default username
    socket.username="Anonymous";

    //list on change_username
    socket.on('change_username',data=>{
        console.log("new user is "+data.username);
        socket.username=data.username;
    })
    
    //listen on new message
    socket.on('new_message',data=>{
        //broadcasting new_message to all clients including client of this event
        io.sockets.emit('new_message',{message:data.message,username:socket.username})

    })

    //listen on typing
    socket.on('typing',data=>{
        //broadcasting typing keyword to all clients excluding client of this event
        socket.broadcast.emit('typing',{username:socket.username}); 

        //but here i used only single client at a time so im going with this for now  but when multiple clients above one is correct
        // io.sockets.emit('typing',{username:socket.username}); 
    })
})





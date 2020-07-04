const express = require('express');
const app = express();

//set template engine ejs
app.set('viewengine','ejs');

//middlewares
app.use(express.static('public'));

//listen on port 3000
server = app.listen(3000);

const io=require('socket.io')(server);



app.get('/',(req,res) => {
   res.render('index.ejs');
})


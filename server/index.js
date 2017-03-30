var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/',function (req, res) {
    res.status(200).send('Servidor funcionando');
});

var messages = [{
    id: 1,
    text: 'Bienvenido al chat de prueba',
    nickname: 'Bot'
}];

io.on('connection', function(socket){
    console.log("Conectado desde la IP: "+socket.handshake.address);
    socket.emit('messages',messages);
    socket.on('add-message',function(data){
        messages.push(data);
        io.sockets.emit('messages',messages);
    });
});

server.listen(6677, function () {
    console.log("Servidor en marcha, en http://localhost:6677");
});

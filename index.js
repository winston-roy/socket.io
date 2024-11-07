const http = require('http');
const path = require('path');
const express = require('express');

const { Server } = require("socket.io");

const app = express();

app.use(express.static(path.resolve('./public')))

const server = http.createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.on('user-msg', (msg) => {
        io.emit('message', msg)
    })
});

app.get('/', (req, res) => {
    return res.sendFile('./public/index.html')
})

server.listen(9000, () => console.log(`Server listening to the port 9000`))
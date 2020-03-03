const express = require('express')
// const http = require('http')
// const socketIo = require("socket.io")

//database
require('./db/mongoose')

//routes
const userRouter = require('./routes/userRouter')
const roomRouter = require('./routes/roomRouter')
const messageRouter = require('./routes/messageRouter')
const emailRouter = require('./routes/emailRouter')

//setup
const app = express()

app.use(express.json())
app.use(userRouter)
app.use(roomRouter)
app.use(messageRouter)
app.use(emailRouter)




const port = process.env.PORT || 5000

const server = app.listen(port, () => {
    console.log('Server with websocket is up on port ' + port) 
})

//websocket
const io = require('socket.io')(server)
app.set('socketio', io)


io.sockets.on('connection', (socket) => {
    // console.log("New Client connected")

    socket.on('serverPing', ()=> {
        socket.emit('returnPing', 'you are connected')
        socket.broadcast.emit('newUser')
    })

    socket.on('joinRoom', (room) => {
        console.log('room joined', room)
        socket.join(room);
    });

    socket.on('leaveRoom', (room) => {
        // console.log('user left room', room)
        socket.leave(room)
    })

})
const express = require('express')
const auth = require('../middleware/auth')
const Message = require('../models/message')
const router = new express.Router()

router.post('/api/message', auth, async (req, res) => {
    const io = req.app.get('socketio')
    const message = new Message({
        ...req.body,
        owner: req.user._id
    })

    console.log(message)

    try {
        await message.save()
        io.sockets.in(message.room).emit('newMessage', message)

        res.status(201).send()
    } catch (e) { 
        console.log(e)
        res.status(400).send(e)
    }
})

module.exports = router
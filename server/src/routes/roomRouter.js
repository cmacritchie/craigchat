const express = require('express')
const auth = require('../middleware/auth')
const Room = require('../models/room')
const Message = require('../models/message')
const router = new express.Router()

router.post('/api/room', auth, async (req, res) => {
    const io = req.app.get('socketio')

    const room = new Room({
        ...req.body,
        owner: req.user._id
    })

    try {
        await room.save()
        io.emit('postedRoom', room)
        res.status(201).send()
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/api/room', async (req, res) => {
    try {
        const room = await Room.find({})
        res.send(room)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/api/room/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const messages = await Message.find({ room:_id }).sort({date: 1})

        if(!messages){
            return res.send([])
        }
        
        res.send(messages)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/api/room/:id', auth, async (req, res) => {
    const _id = req.params.id
    const owner = req.user._id
    const io = req.app.get('socketio')

    try {
        const room = await Room.findOneAndDelete({ _id, owner })

        if(!room){
            res.status(404).send()
        }
        io.emit('deletedRoom', room)
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
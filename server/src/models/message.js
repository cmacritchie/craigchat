const mongoose = require('mongoose')
const { Schema } = mongoose

const messageSchema = new Schema({
    text: {
        type: String,
        required: true,
        trim: true,
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Room'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
}, {
    timestamps:true
})

module.exports = mongoose.model('Message', messageSchema)
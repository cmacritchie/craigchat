const mongoose = require('mongoose')
const { Schema } = mongoose

const roomSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    messages:[{
        message:{
            type:Object
        }
        // message:{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Message'
        // }
    }]
}, {
    timestamps:true
})

module.exports = mongoose.model('Room', roomSchema)
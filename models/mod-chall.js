const argon2 = require('argon2')
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const db = require('../handlers/han-db.js')

//define schema
const challSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    tags : {
        type: Array,
        default: []
    }
}, {
    timestamps: true 
})

challSchema.statics.AVAILABLE_TAGS = ["i never learnt how to read", "option two"]

//export
const Chall = db.mainDb.model('Chall', challSchema, 'chall')
module.exports = Chall
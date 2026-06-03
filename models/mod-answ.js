const argon2 = require('argon2')
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const db = require('../handlers/han-db.js')

//define schema
const answSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    op: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true 
})


//export
const Answ = db.mainDb.model('Answ', answSchema, 'answ')
module.exports = Answ
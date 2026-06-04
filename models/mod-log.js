const argon2 = require('argon2')
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const db = require('../handlers/han-db.js')

//define schema
const logSchema = new Schema({
    line: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, {
    timestamps: true 
})

logSchema.statics.write = async function (str) {
    const timestamp = new Date().toISOString()
    const newitem = await this.create({
        line: str,
        date: timestamp
    })
    return newitem
}
logSchema.statics.get = async function () {
    return await this.find().sort({ createdAt: -1 })
}

//export
const Log = db.mainDb.model('Log', logSchema, 'log')
module.exports = Log

const argon2 = require('argon2')
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const db = require('../handlers/han-db.js')

//define schema
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        required: true
    }
}, {
    timestamps: true 
})

//hash password
userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await argon2.hash(this.password)
    }
})


//export
const User = db.mainDb.model('User', userSchema, 'users')
module.exports = User
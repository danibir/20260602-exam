const argon2 = require('argon2')
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Answ = require('./mod-answ.js')
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
    tags: {
        type: Array,
        default: []
    },
    replies: {
        type: Array,
        default: []
    },
    op: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true 
})

challSchema.pre('findOneAndDelete', async function () {
    const doc = await this.model.findOne(this.getFilter())
    if (!doc) return

    if (doc.replies.length > 0) {
        await Answ.deleteMany({ _id: { $in: doc.replies } })
    }
});

challSchema.statics.AVAILABLE_TAGS = [
    "Fellesfag",
    "Yrkesfag",
    "Prøveforbredelse",
    "Ressurser",
    "Klasserommet",
    "Hjemme"
]

//export
const Chall = db.mainDb.model('Chall', challSchema, 'chall')
module.exports = Chall
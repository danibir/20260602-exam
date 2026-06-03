const Chall = require('../models/mod-chall')
const Answ = require('../models/mod-answ')
const User = require('../models/mod-user')
const Log = require('../models/mod-log')
const { setMetaData, render500 } = require('../handlers/han-main')

const challCreate_get = (req, res) => {
    setMetaData(req, res, "challcreate get", "Registrer utfordring", "challcreate")
    const tags = Chall.AVAILABLE_TAGS
    res.render('challengeRegister', { tags })
}
const challCreate_post = async (req, res) => {
    setMetaData(req, res, "challcreate post")
    const title = req.body.title.slice(0, 50)
    const content = req.body.content
    try {
        const status = Number(req.body.status)
        let tags = req.body.tags || []
        if (!Array.isArray(tags)) tags = [tags]

        const allValid = tags.every(item => Chall.AVAILABLE_TAGS.includes(item))
        if (!allValid) return res.status(400).send("Missing required fields")
            
        if (!title || !content || isNaN(status)) {
            return res.status(400).send("Missing required fields")
        }

        const op = await User.findOne({ username: req.name })
        console.log(op)

        const challObj = {
            title: req.body.title,
            content: req.body.content,
            status: Number(req.body.status),
            tags: tags,
            op: op._id
        }
        console.log(challObj)
        const chall = new Chall(challObj)
        await chall.save()
        Log.write(`${op.username} (${op.rank}) created post: ${chall.title} (${chall._id})!`)
        res.redirect('/')
    } catch (err) {
        render500(req, res)
    }
}
const challView_get = async (req, res) => {
    setMetaData(req, res, "challcreate get", "Utfordring", "challcreate")
    const id = req.params._id
    try {
        const chall = await Chall.findById(id)
        const tags = Chall.AVAILABLE_TAGS
        let op = await User.findById(chall.op)
        if (!op) op = {
            username: "Slettet-bruker"
        }
        const replies = await Promise.all(
            chall.replies.map(async (replyId) => {
                const replyObj = await Answ.findById(replyId)
                const replyOp = await User.findById(replyObj.op) || { username: "Slettet-bruker" }
                replyObj.op = replyOp
                return replyObj
            })
        )
        res.render('challengeView', { chall, tags, op, replies })
    } catch (err) {
        render500(req, res)
    }
}

module.exports = {
    challCreate_get,
    challCreate_post,
    challView_get
}
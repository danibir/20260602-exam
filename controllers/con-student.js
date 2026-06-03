const Chall = require('../models/mod-chall')
const User = require('../models/mod-user')
const Log = require('../models/mod-log')

const challCreate_get = (req, res) => {
    res.locals.navCurr = "challcreate"
    res.locals.metatitle = "Registrer utfordring"
    console.log('challCreate get')
    const tags = Chall.AVAILABLE_TAGS
    res.render('challengeRegister', { tags })
}

const challCreate_post = async (req, res) => {
    console.log('challCreate post')
    const title = req.body.title
    const content = req.body.content
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
}

const challView_get = async (req, res) => {
    res.locals.metatitle = "Utfordring"
    const id = req.params._id
    const chall = await Chall.findById(id)
    const tags = Chall.AVAILABLE_TAGS
    let op = await User.findById(chall.op)
    if (!op) op = {
        username: "Slettet-bruker"
    }
    res.render('challengeView', { chall, tags, op })
}

module.exports = {
    challCreate_get,
    challCreate_post,
    challView_get
}
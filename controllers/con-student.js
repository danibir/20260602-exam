const Chall = require('../models/mod-chall')

const createChall_get = (req, res) => {
    console.log('createchall get')
    const tags = Chall.AVAILABLE_TAGS
    res.render('challengeRegister', { tags })
}

const createChall_post = async (req, res) => {
    console.log('createchall post')
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

    const challObj = {
        title: req.body.title,
        content: req.body.content,
        status: Number(req.body.status),
        tags: tags
    }
    console.log(challObj)
    const chall = new Chall(challObj)
    await chall.save()
    res.redirect('/')
}

module.exports = {
    createChall_get,
    createChall_post
}
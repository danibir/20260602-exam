const Chall = require('../models/mod-chall')
const Answ = require('../models/mod-answ')
const User = require('../models/mod-user')
const Log = require('../models/mod-log')
const { popUp } = require('../handlers/han-con')
const { setMetaData, render500 } = require('../handlers/han-main')

const challOverview_get = async (req, res) => {
    setMetaData(req, res, "challoverview get", "Utfordringer", "chall")
    const search = req.query.search
    let  usedTags = req.query.tags || []
    if (!Array.isArray(usedTags)) usedTags = [usedTags]
    const status = req.query.status

    const query = {}
    if (search) {
        query.title = { $regex: search, $options: "i" }
    }
    if (usedTags.length > 0) {
        query.tags = { $all: usedTags }
    }
    if (status) {
        query.status = status
    }
    try {
        let challs = await Chall.find(query)
        challs.forEach((elm) => {
            const titlemax = 30
            const contentmax = 40
            if (elm.title.length > titlemax)
                elm.title = elm.title.substring(0, titlemax) + "..."
            if (elm.content.length > contentmax)
                elm.content = elm.content.substring(0, contentmax) + "..."
        })
        const tags = Chall.AVAILABLE_TAGS
        res.render('challengeOverview', { challs, tags, query: req.query })
    } catch (err) {
        render500(req, res)
    }
}
const challEdit_post = async (req, res) => {
    setMetaData(req, res, "challedit post")
    const id = req.params._id
    try {
        const status = Number(req.body.status)
        let tags = req.body.tags || []
        if (!Array.isArray(tags)) tags = [tags]
        const chall = await Chall.findById(id)
        if (!chall) {
            popUp(res, "bad", "Kunne ikke finne utfordring")
            return res.redirect(`/teacher/chall/view/${id}`)
        }
        chall.status = status
        chall.tags = tags
        await chall.save()
        popUp(res, "good", "Oppdaterte utfordring!")
        Log.write(`${req.name} (${req.rank}) updated "${chall.title}" (${chall._id})`)
        return res.redirect(`/teacher/chall/view/${id}`)
    } catch(err) {
        render500(req, res, err)
    }
}
const answerCreate_post = async (req, res) => {
    setMetaData(req, res, "answerCreate post")
    const id = req.params._id
    const content = req.body.content
    try {
        const chall = await Chall.findById(id)
        if (!chall) {
            popup(res, "bad", "Kunne ikke finne utfordring")
            return res.redirect('/teacher/chall/view')
        }
        
        const op = await User.findOne({ username: req.name })
        console.log(op)

        const answObj = {
            content,
            op: op._id
        }
        const answ = new Answ(answObj)
        await answ.save()
        chall.replies.push(answ._id)
        await chall.save()
        popUp(res, "good", "La til kommentar!")
        Log.write(`${req.name} (${req.rank}) answered "${chall.title}" (${chall._id})`)
        return res.redirect(`/teacher/chall/view/${id}`)
    } catch (err) {
        render500(req, res)
    }
}

module.exports = {
    challOverview_get,
    challEdit_post,
    answerCreate_post
}
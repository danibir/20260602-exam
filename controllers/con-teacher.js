const Chall = require('../models/mod-chall')

const challOverview_get = async (req, res) => {
    res.locals.navCurr = "chall"
    res.locals.metatitle = "Utfordringer"
    const search = req.query.search
    const usedTags = req.query.tags || []
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
}


module.exports = {
    challOverview_get
}
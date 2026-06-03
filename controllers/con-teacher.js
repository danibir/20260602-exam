const Chall = require('../models/mod-chall')

const challOverview_get = async (req, res) => {
    res.locals.navCurr = "chall"
    res.locals.metatitle = "Utfordringer"
    const search = req.query.search
    let challs
    if (search) challs = await Chall.find({
        title: { $regex: search, $options: "i" }
    })
    else challs = await Chall.find()
    challs.forEach((elm) => {
        const titlemax = 30
        const contentmax = 40
        if (elm.title.length > titlemax)
            elm.title = elm.title.substring(0, titlemax) + "..."
        if (elm.content.length > contentmax)
            elm.content = elm.content.substring(0, contentmax) + "..."
    })
    res.render('challengeOverview', { challs, search })
}


module.exports = {
    challOverview_get
}
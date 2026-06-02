const Chall = require('../models/mod-chall')

const challOverview_get = async (req, res) => {
    const challs = await Chall.find()
    res.render('challengeOverview', { challs })
}

const challView_get = async (req, res) => {
    const id = req.params._id
    const chall = await Chall.findById(id)
    res.render('challengeView', { chall })
}

module.exports = {
    challOverview_get,
    challView_get
}
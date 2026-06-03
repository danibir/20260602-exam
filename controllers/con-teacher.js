const Chall = require('../models/mod-chall')

const challOverview_get = async (req, res) => {
    const challs = await Chall.find()
    res.render('challengeOverview', { challs })
}


module.exports = {
    challOverview_get
}
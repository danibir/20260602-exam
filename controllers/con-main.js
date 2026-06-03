const User = require('../models/mod-user')
const Chall = require('../models/mod-chall')
const han_mod = require('../handlers/han-mod')
const { setMetaData, render500 } = require('../handlers/han-main')

const index_get = (req, res) => {
    setMetaData(req, res, "index get", "Hjem", "home")
    res.render('index')
}
const profile_get = async (req, res) => {
    setMetaData(req, res, "profile get", "Profil", "profile")
    try {
        const user = await User.findOne({ username: req.name })
        const challs = await Chall.find({ op: user._id })
        res.render('userView', { user, challs })
    } catch (err) {
        render500(req, res)
    }
}
const changepasswd_get = async (req, res) => {
    setMetaData(req, res, "changepassword get", "Endre passord")
    res.render('changePassword')
}
const changepasswd_post = async (req, res) => {
    setMetaData(req, res, "changepassword post")
    const oldpass = req.body.oldpassword
    const newpass = req.body.newpassword
    const newpass2 = req.body.newpassword2
    if (newpass != newpass2) return res.redirect('/profile/changepasswd')
    try {
        const login = await han_mod.login(req.name, oldpass)
        if (!login.success) return res.redirect('/profile/changepasswd')
        login.result.password = newpass
        login.result.save()
        res.redirect('/profile')
    } catch (err) {
        render500(req, res)
    }
}

module.exports = {
    index_get,
    profile_get,
    changepasswd_get,
    changepasswd_post
}
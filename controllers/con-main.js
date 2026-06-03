const User = require('../models/mod-user')
const Chall = require('../models/mod-chall')
const han_mod = require('../handlers/han-mod')

const index_get = (req, res) => {
    console.log('index get')
    res.locals.navCurr = "home"
    res.locals.metatitle = "Hjem"
    res.render('index')
}
const profile_get = async (req, res) => {
    res.locals.navCurr = "profile"
    res.locals.metatitle = "Profil"
    const user = await User.findOne({ username: req.name })
    const challs = await Chall.find({ op: user._id })
    res.render('userView', { user, challs })
}
const changepasswd_get = async (req, res) => {
    res.render('changePassword')
}
const changepasswd_post = async (req, res) => {
    const oldpass = req.body.oldpassword
    const newpass = req.body.newpassword
    const newpass2 = req.body.newpassword2
    if (newpass != newpass2) return res.redirect('/profile/changepasswd')
    const login = await han_mod.login(req.name, oldpass)
    if (!login.success) return res.redirect('/profile/changepasswd')
    login.result.password = newpass
    login.result.save()
    res.redirect('/profile')
}

module.exports = {
    index_get,
    profile_get,
    changepasswd_get,
    changepasswd_post
}
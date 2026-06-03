const han_mod = require('../handlers/han-mod')
const { setMetaData, render500 } = require('../handlers/han-main')
const User = require('../models/mod-user')
const Chall = require('../models/mod-chall')
const Log = require('../models/mod-log')
const Answ = require('../models/mod-answ')

const log_get = async (req, res) => {
    setMetaData(req, res, "log get", "Logg", "log")
    try {
        const logs = await Log.get()
        res.render('logs', { logs })
    } catch (err) {
        render500(req, res, err)
    }
}
const userCreate_get = (req, res) => {
    setMetaData(req, res, "usercreate get", "Registrer bruker")
    res.render('userCreate')
}
const userCreate_post = async (req, res) => {
    setMetaData(req, res, "usercreate post")
    const username = req.body.username
    const password = req.body.password
    const rank = req.body.rank
    try {
        const signup = await han_mod.signup(username, password, rank)
        if (!signup) console.log("createuser fail")
        else Log.write(`${req.name} (sysadmin) created user: ${username} (${rank})!`)
        return res.redirect('/admin/user/view')
    } catch(err) {
        render500(req, res, err)
    }
}
const userOverview_get = async (req, res) => {
    setMetaData(req, res, "useroverview get", "Brukere", "users")
    res.locals.navCurr = "users"
    res.locals.metatitle = "Brukere"
    const search = req.query.search
    let users
    try {
        if (search) users = await User.find({
            username: { $regex: search, $options: "i" }
        })
        else users = await User.find()
        res.render('userOverview', { users,search })
    } catch (err) {
        render500(req, res, err)
    }
}
const userView_get = async (req, res) => {
    setMetaData(req, res, "userview get", "Bruker")
    const id = req.params._id
    try {
        const user = await User.findById(id)
        console.log(id)
        console.log(user)
        res.render('userView', { user })
    } catch (err) {
        render500(req, res, err)
    }
}
const userEdit_post = async (req, res) => {
    setMetaData(req, res, "useredit post")
    const id = req.params._id
    const rank = req.body.rank
    try {
        let user = await User.findById(id)
        if (!user) return res.redirect(`/admin/user/view/`)
        user.rank = rank
        user.save()
        Log.write(`${req.name} (sysadmin) updated user ${user.username}'s rank to (${rank})!`)
        return res.redirect('/')
    } catch(err) {
        render500(req, res, err)
    }
}
const userDelete_post = async (req, res) => {
    setMetaData(req, res, "userdelete post")
    const id = req.params._id
    try {
        let user = await User.findById(id)
        console.log(id)
        console.log(user)
        if (!user) return res.redirect(`/admin/user/view/`)

        user = await User.findByIdAndDelete(id)
        Log.write(`${req.name} (sysadmin) deleted user: ${user.username} (${user.rank})!`)
        return res.redirect(`/admin/user/view/`)
    } catch (err) {
        render500(req, res, err)
    }
}
const challDelete_post = async (req, res) => {
    setMetaData(req, res, "challDelete post")
    const _id = req.params._id
    try {
        let chall = await Chall.findById(_id)
        if (!chall) {
            return res.redirect(`/teacher/chall/view/${_id}`)
        }
        await Chall.findByIdAndDelete(_id)
        Log.write(`${req.name} (sysadmin) deleted post: ${chall.title} (${chall._id})!`)
        res.redirect(`/teacher/chall/view`)
    } catch (err) {
        render500(req, res, err)
    }
}
const answDelete_post = async (req, res) => {
    setMetaData(req, res, "answDelete post")
    const _id = req.params._id
    try {
        let answ = await Answ.findById(_id)
        let chall = await Chall.findReply(_id)
        if (!answ) {
            return res.redirect(`/teacher/chall/view/${_id}`)
        }
        console.log(chall)
        chall.replies.splice(chall.replies.indexOf(_id), 1)
        await chall.save()
        await Answ.findByIdAndDelete(_id)
        Log.write(`${req.name} (sysadmin) deleted answer in "${chall.title}" (${chall._id})!`)
        res.redirect(`/teacher/chall/view/${chall._id}`)
    } catch (err) {
        render500(req, res, err)
    }
}

module.exports = {
    log_get,
    userCreate_get,
    userCreate_post,
    userEdit_post,
    userDelete_post,
    userOverview_get,
    userView_get,
    challDelete_post,
    answDelete_post
}
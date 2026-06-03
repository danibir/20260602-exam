const han = require('../handlers/han-mod')
const User = require('../models/mod-user')
const Chall = require('../models/mod-chall')
const Log = require('../models/mod-log')

const log_get = async (req, res) => {
    res.locals.navCurr = "log"
    res.locals.metatitle = "Logg"
    const logs = await Log.get()
    res.render('logs', { logs })
}
const userCreate_get = (req, res) => {
    console.log('createuser get')
    res.render('userCreate')
}
const userCreate_post = async (req, res) => {
    console.log('createuser post')
    const username = req.body.username
    const password = req.body.password
    const rank = req.body.rank
    try {
        const signup = await han.signup(username, password, rank)
        if (!signup) console.log("createuser fail")
        else Log.write(`${req.name} (sysadmin) created user: ${username} (${rank})!`)
        return res.redirect('/')
    } catch(err) {
        console.log(`createuser post error: ${err}`)
        return res.redirect('/')
    }
}
const userOverview_get = async (req, res) => {
    res.locals.navCurr = "users"
    res.locals.metatitle = "Brukere"
    const search = req.query.search
    let users
    if (search) users = await User.find({
        username: { $regex: search, $options: "i" }
    })
    else users = await User.find()
    res.render('userOverview', { users,search })
}

const userView_get = async (req, res) => {
    const id = req.params._id
    const user = await User.findById(id)
    console.log(id)
    console.log(user)
    res.render('userView', { user })
}
const userEdit_post = async (req, res) => {
    console.log('createuser post')
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
        console.log(`createuser post error: ${err}`)
        return res.redirect(`/admin/user/view/`)
    }
}
const userDelete_post = async (req, res) => {
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
        console.log(err)
        return res.redirect(`/admin/user/view/`)
    }
}
const challDelete_post = async (req, res) => {
    const _id = req.params._id
    let chall = await Chall.findById(_id)
    try {
        if (!chall) {
            return res.redirect(`/teacher/chall/view/${_id}`)
        }
        await Chall.findByIdAndDelete(_id)
        Log.write(`${req.name} (sysadmin) deleted post: ${chall.title} (${chall._id})!`)
        res.redirect(`/teacher/chall/view`)
    } catch (err) {
        console.log(err)
        res.redirect(`/teacher/chall/view/${_id}`)
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
    challDelete_post
}
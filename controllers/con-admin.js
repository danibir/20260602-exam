const han = require('../handlers/han-mod')
const User = require('../models/mod-user')
const { login_perform } = require('../handlers/han-con')

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
        return res.redirect('/')
    } catch(err) {
        console.log(`createuser post error: ${err}`)
        return res.redirect('/')
    }
}
const userOverview_get = async (req, res) => {
    const users = await User.find()
    res.render('userOverview', { users })
}

const userView_get = async (req, res) => {
    const id = req.params._id
    const user = await User.findById(id)
    res.render('userView', { user })
}

module.exports = {
    userCreate_get,
    userCreate_post,
    userOverview_get,
    userView_get
}
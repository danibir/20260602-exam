//import
const han = require('../handlers/han-mod')
const { login_perform } = require('../handlers/han-con')

//login page
const login_get = (req, res) => {
    res.render('login')
}

//login post logic
const login_post = async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    try {
        const user = await login_perform(res, username, password)
        if (user) return res.redirect('/')

        res.redirect('./login')
    } catch (err) {
        console.log(`Login post error: ${err}`)
        res.redirect('./login')
    }
}

//log out
const logout_post = (req, res) => {
    console.log('logging out')
    console.log(`# User ${req.name} (${req.rank}) logged out!`)
    res.clearCookie('user')
    res.redirect('./login')
}

//export
module.exports = {
    login_get,
    login_post,
    logout_post
}
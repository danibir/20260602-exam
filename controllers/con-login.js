const han = require('../handlers/han-mod')
const { login_perform, popUp } = require('../handlers/han-con')
const { setMetaData, render500 } = require('../handlers/han-main')

const login_get = (req, res) => {
    setMetaData(req, res, "login get", "Logg inn")
    res.render('login')
}
const login_post = async (req, res) => {
    setMetaData(req, res, "login post")
    const username = req.body.username
    const password = req.body.password
    try {
        const user = await login_perform(res, username, password)
        if (!user.success) {
            popUp(res, "bad", user.result)
            return res.redirect('./login')
        } 
        popUp(res, "good", "Logget inn!")
        return res.redirect('/')
    } catch (err) {
        render500(req, res)
    }
}
const logout_post = (req, res) => {
    setMetaData(req, res, "logout post")
    popUp(res, "good", "Logget ut")
    res.clearCookie('user')
    res.redirect('./login')
}

module.exports = {
    login_get,
    login_post,
    logout_post
}
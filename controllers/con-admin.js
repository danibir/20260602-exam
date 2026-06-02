const han = require('../handlers/han-mod')
const { login_perform } = require('../handlers/han-con')

const createuser_get = (req, res) => {
    console.log('createuser get')
    res.render('adminUserCreate')
}
const createuser_post = async (req, res) => {
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

module.exports = {
    createuser_get,
    createuser_post
}
const jwt = require("jsonwebtoken")
const User = require('../models/mod-user')
const han_mod = require('../handlers/han-mod')
const han = require('../handlers/han-main')

//JWT token verification
const auth = async (req, res, next) => {
    const token = req.cookies?.user
    console.log('auth')
    if (token) {
        try {
            const payload = jwt.verify(token, process.env.SECRET)
            console.log(payload)
            const user = await han_mod.userExists(payload.username)
            
            req.rank = user.rank
            res.locals.rank = user.rank

            res.locals.name = payload.username
            req.name = payload.username
            res.locals.loggedIn = true

            return next()
        } catch (err) {
            console.log(err)
            res.clearCookie('user')
            return res.redirect('/login/login')
        }
    } else {
        console.log('no token auth')
        next()
    }
}
const authRestrain = (req, res, next) => {
    const token = req.cookies?.user
    console.log('authrestrain')
    if (!token) return res.redirect('/login/login')
    console.log('passed')
    next('')
}

const reverseAuth = (req, res, next) => {
    const token = req.cookies?.user
    if (token) return res.redirect('/')
    next()
}

const authRole = (role) => (req, res, next) => {
    if (req.rank != role && req.rank != "sysadmin") 
        return han.renderErrorPage(res, 403, "Forbidden")
    next()
}

module.exports = {
    auth,
    authRestrain,
    reverseAuth,
    authRole
}
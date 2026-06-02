const jwt = require("jsonwebtoken")
const User = require('../models/mod-user')
const han = require('../handlers/han-mod')

//JWT token verification
const auth = async (req, res, next) => {
    const token = req.cookies?.user
    console.log('auth')
    if (token) {
        try {
            const payload = jwt.verify(token, process.env.SECRET)
            console.log(payload)
            const user = await han.userExists(payload.username)
            
            if (user.isAdmin == false) {
                console.log('user')
            } else {
                console.log('admin')
                res.locals.isAdmin = true
                res.isAdmin = true
            }

            res.locals.name = payload.username
            req.user = payload.username
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

const authAdmin = async (req, res, next) => {
    if (!req.user) {
        return res.status('error', { error: "403 - Forbidden" })
    }
    next()
}

module.exports = {
    auth,
    authRestrain,
    reverseAuth,
    authAdmin
}
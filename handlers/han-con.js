const User = require('../models/mod-user')
const han = require('../handlers/han-mod')
const jwt = require("jsonwebtoken")

//login handler
const login_perform = async (res, username, password) => {
    try {
        console.log('performing login')
        const login = await han.login(username, password)
        if (!login) return console.log('incredential fails')

        const token = jwt.sign({ username }, process.env.SECRET, { expiresIn: '120m' })
        res.cookie('user', token, { httpOnly: true, sameSite: 'strict'})
        console.log(`# User ${username} (${login.rank}) logged in!`) //*
        return login
    } catch (err) {
        throw new Error(`Login perform error: ${err}`)
    }
}
module.exports = {
    login_perform
}
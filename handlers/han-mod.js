const User = require('../models/mod-user')
const argon2 = require('argon2')


//login
const signup = async(username, password, rank) => {
    const rankList = ["student", "teacher", "admin"]
    if (!rankList.includes(rank)) return console.log('signup fail, invalid rank')
    const name = username.trim().toLowerCase()
    const userExists = await User.exists({ username: name })
    if(userExists) return console.log('signup fail, user exists')
    
    const userObj = {
        username: username,
        password: password,
        rank: rank
    }
    const user = new User(userObj)
    await user.save()

    console.log('signup success')
    return user
}
const login = async(username, password) => {
    console.log('logging in')
    const name = username.trim().toLowerCase()
    const user = await User.findOne({ username: name })
    if(!user) return console.log('noUser')
    
    const valid = await argon2.verify(user.password, password)
    if (!valid) return console.log('noPass')

    console.log('login success')
    return user
}
const userExists = async(username) => {
    console.log('calling user')
    const name = username.trim().toLowerCase()
    const user = await User.findOne({ username: name })
    if(!user) return console.log('no user found')
    console.log('found user')
    return user
}

module.exports = {
    signup,
    login,
    userExists
}
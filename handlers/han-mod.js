const User = require('../models/mod-user')
const argon2 = require('argon2')


//login
const signup = async(username, password, key) => {
    const name = username.trim().toLowerCase()
    const userExists = await User.exists({ username: name })
    if(userExists) return

    const userObj = {
        username: username,
        password: password,
        isAdmin: false
    }
    const user = new User(userObj)
    await user.save()
    console.log('success signup')
    return user
}
const login = async(username, password) => {
    console.log('logging in')
    const name = username.trim().toLowerCase()
    const user = await User.findOne({ username: name })
    if(!user) return console.log('noUser')
    
    const valid = await argon2.verify(user.password, password)
    if (!valid) return console.log('noPass')
        
    return user
}
const userExists = async(username) => {
    console.log('calling user')
    console.log(username)
    const name = username.trim().toLowerCase()
    console.log(name)
    const user = await User.findOne({ username: name })
    if(!user) return console.log('no user found')

    return user
}

module.exports = {
    signup,
    login,
    userExists
}
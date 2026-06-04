const User = require('../models/mod-user')
const Log = require('../models/mod-log')
const han_mod = require('../handlers/han-mod')

const setRootUser = async () => {
    const userR = await User.findOne({ username: "root" })
    if (userR) {
        userR.rank = "sysadmin"
        userR.save()
        return
    }
    console.log('root doesnt exist')
    const signup = await han_mod.signup("root", "root", "sysadmin")
    if (!signup) return console.log("rootinit fail")
    Log.write(`root user has been created!`)
    return console.log('rootinit success')
}

module.exports = setRootUser
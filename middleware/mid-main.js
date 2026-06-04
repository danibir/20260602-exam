const setLocals = (req, res, next) => {
    res.locals.name = "NaN"
    res.locals.isAdmin = false
    res.locals.loggedIn = false
    res.locals.metatitle = "Ukjent side"
    res.locals.navCurr = ""
    res.locals.popup = req.cookies?.popup
    res.clearCookie('popup')
    console.log(req.cookies)
    req.user = NaN
    next()
}
const dbSetStatus = (status) => (req, res, next) => {
    req.isDBConnected = status
    res.locals.dbFail = !status
    if (!status) {
        res.clearCookie('user')
    }
    next()
}

module.exports = {
    setLocals,
    dbSetStatus
}
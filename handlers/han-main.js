const setMetaData = (req, res, name, metatitle = NaN, navCurr = NaN) => {
    req.reqname = name
    console.log(name)
    res.locals.metatitle = metatitle
    res.locals.navCurr = navCurr
}

const renderErrorPage = (res, code, message) => {
    res.locals.metatitle = code
    res.status(code).render('error', {code, message})
}

const render500 = (req, res, err) => {
    console.log(`${req.reqname} error: ${err}`)
    renderErrorPage(res, 500, "Intern server feil.")
}

module.exports = {
    setMetaData,
    renderErrorPage,
    render500
}
const index_get = (req, res) => {
    console.log('index get')
    res.render('index')
}

module.exports = {
    index_get
}
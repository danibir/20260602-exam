const express = require('express')
const router = express.Router()

const c_main = require('../controllers/con-main')

router.get('/', c_main.index_get)

module.exports = router
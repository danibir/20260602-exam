const express = require('express')
const router = express.Router()

const c_main = require('../controllers/con-main')

router.get('/', c_main.index_get)
router.get('/profile', c_main.profile_get)
router.get('/profile/changepasswd', c_main.changepasswd_get)
router.post('/profile/changepasswd', c_main.changepasswd_post)

module.exports = router
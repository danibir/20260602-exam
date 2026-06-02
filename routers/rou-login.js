const express = require('express')
const router = express.Router()

const c_login = require('../controllers/con-login')

const m_auth = require('../middleware/mid-auth')
const m_rate = require('../middleware/mid-rate')

router.post('/log-out', c_login.logout_post)

router.use(m_auth.reverseAuth)

router.get('/login', c_login.login_get)
router.post('/login', m_rate.result, c_login.login_post)

module.exports = router
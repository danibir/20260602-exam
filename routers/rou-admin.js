const express = require('express')
const router = express.Router()

const c_admin = require('../controllers/con-admin')

const mid_auth = require('../middleware/mid-auth')

router.use(mid_auth.authRole('sysadmin'))

router.get('/users/create', c_admin.createuser_get)
router.post('/users/create', c_admin.createuser_post)

module.exports = router
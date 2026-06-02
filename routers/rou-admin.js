const express = require('express')
const router = express.Router()

const c_admin = require('../controllers/con-admin')

const mid_auth = require('../middleware/mid-auth')

router.use(mid_auth.authRole('sysadmin'))

router.get('/user/create', c_admin.userCreate_get)
router.post('/user/create', c_admin.userCreate_post)
router.get('/user/view', c_admin.userOverview_get)
router.get('/user/view/:_id', c_admin.userView_get)

module.exports = router
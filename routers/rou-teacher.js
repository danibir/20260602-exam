const express = require('express')
const router = express.Router()

const c_teacher = require('../controllers/con-teacher')

const mid_auth = require('../middleware/mid-auth')

router.use(mid_auth.authRole('teacher'))

router.get('/chall/view', c_teacher.challOverview_get)
router.get('/chall/view/:_id', c_teacher.challView_get)

module.exports = router
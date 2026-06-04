const express = require('express')
const router = express.Router()

const c_student = require('../controllers/con-student')

const mid_auth = require('../middleware/mid-auth')

router.use(mid_auth.authRole('student'))

router.get('/create', c_student.challCreate_get)
router.post('/create', c_student.challCreate_post)
router.get('/view/:_id', c_student.challView_get)
router.post('/answ/feedback/:_id', c_student.answFeedback_post)

module.exports = router
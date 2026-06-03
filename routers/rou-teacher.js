const express = require('express')
const router = express.Router()

const c_student = require('../controllers/con-student')
const c_teacher = require('../controllers/con-teacher')

const mid_auth = require('../middleware/mid-auth')

router.use(mid_auth.authRole('teacher'))

router.get('/chall/view', c_teacher.challOverview_get)
router.get('/chall/view/:_id', c_student.challView_get)
router.post('/chall/update/:_id', c_teacher.challEdit_post)
router.post('/chall/answer/:_id', c_teacher.answerCreate_post)

module.exports = router
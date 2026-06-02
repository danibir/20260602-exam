const express = require('express')
const router = express.Router()

const c_student = require('../controllers/con-student')

const mid_auth = require('../middleware/mid-auth')

router.use(mid_auth.authRole('student'))

router.get('/create', c_student.createChall_get)
router.post('/create', c_student.createChall_post)

module.exports = router
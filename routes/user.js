const express = require('express')
const router = express.Router()
const {
    registerUser,
    signInUser,
    deleteUser
} = require('../controllers/user')


router.post('/register', registerUser)
router.post('/signin', signInUser)

module.exports = router
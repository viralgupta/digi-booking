const express = require('express')
const {registerUser, loginUser, bookevent, myEvents} = require('./userController')
const {protect} = require('../middlewear/authMiddleware')
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

const userRoutes = express.Router()

userRoutes.route('/signup').post(registerUser)
userRoutes.route('/login').post(loginUser)
userRoutes.route('/myevents').post(protect, myEvents)
userRoutes.route('/bookevent').post(upload.single('fileContent'), bookevent)


module.exports= userRoutes




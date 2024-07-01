const express = require('express')
const { getEvents, myEvents, createEvent, verifyEvent, verifyBooking, verifyEventByUrl} = require('./eventController')
const {protect} = require('../middlewear/authMiddleware')
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

const eventRoutes = express.Router()


eventRoutes.route('/getevents').get(getEvents)
eventRoutes.route('/myevents').post(myEvents)
eventRoutes.route('/createevent').post(protect, createEvent)
eventRoutes.route('/verifyevent').post(upload.single('fileContent'), verifyEvent)
eventRoutes.route('/verifyeventbyurl').post( verifyEventByUrl)
eventRoutes.route('/verifybooking').post( verifyBooking)

module.exports= eventRoutes




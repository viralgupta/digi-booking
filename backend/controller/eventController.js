const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const AWS = require('aws-sdk');
const Booking = require('../models/Booking');
const Event = require('../models/Events');
require('dotenv').config();

const verifyEvent = asyncHandler(async (req, res) => {
    const {eventid} = req.body;
    try {
        AWS.config.update({
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.ACCESS_SECRET,
            region: 'ap-south-1'
        })
        
        const rekognition = new AWS.Rekognition()
        
        rekognition.listCollections((err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!data.CollectionIds.includes(process.env.FACE_COLLECTION)) {
                console.log("Coudnt find collection")
                return;
            }
            rekognition.searchUsersByImage({
                "CollectionId": process.env.FACE_COLLECTION,
                "Image": {
                    "Bytes": req.file.buffer
                },
                "MaxUsers": 1,
                "UserMatchThreshold": 95
            }, async (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (data.UserMatches.length > 0) {
                    const booking = await Booking.find({userid: data.UserMatches[0].User.UserId, eventid: eventid})
                    if (booking.length > 1) {
                        const notValidatedBooking = booking.filter((booking) => booking.isValidated === false);
                        if(notValidatedBooking.length == 0){
                            res.status(200).json({success: false, message: "Booking already validated!"})
                            return;
                        }
                        else{
                            res.status(200).json({success: true, booking: notValidatedBooking[0]})
                            return;
                        }
                    }
                    else{
                        if(booking.length == 0){
                            res.status(200).json({message: "No Booking Found!"})
                            return;
                        }
                        if(booking[0].isValidated === true){
                            res.status(200).json({success: false, message: "Booking already validated!"})
                            return;
                        }
                        else{
                            res.status(200).json({success: true, booking: booking[0]})
                            return;
                        }
                    }
                }
                else {
                    res.status(200).json({ message: "No Booking Found!" });
                    return;
                }
            })
        })
    } catch (error) {
        console.log(error)
    }
})

const myEvents = asyncHandler(async (req, res) => {
    if (!req.body.userId) {
        res.status(400).json({ success: false, message: "Please Enter all The Fields!" });
        return;
    }
    const events = await Event.find({userId: req.body.userId})
    events.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.status(200).json({events})
})

const createEvent = asyncHandler(async (req, res) => {
    const {name, type, about, userId} = req.body;    
    if (!name || !type || !about || !userId) {
        res.status(400).json({ success: false, message: "Please Enter all The Fields!" });
        return;
    }
    const event = await Event.create({
        name,
        type,
        about,
        userId
    })
    res.status(200).json({success: true, event})
})

const verifyBooking = asyncHandler(async (req, res) => {
    const {bookingId} = req.body;    
    await Booking.findByIdAndUpdate(bookingId, {
        isValidated: true
    })
    res.status(200).json({success: true})
})

const getEvents = asyncHandler(async (req, res) => {
    const events = await Event.find({__v: 0})
    events.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.status(200).json({success: true, Events: events})
})

module.exports = { getEvents, myEvents, createEvent, verifyEvent, verifyBooking }
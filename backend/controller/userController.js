const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const Booking = require('../models/Booking')
const generateToken = require('../config/generateToken')
require('dotenv').config();
const AWS = require('aws-sdk')

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if (!name && !email && !password) {
        res.status(400).json({ success: false, message: "Please Enter all The Fields!" });
        return;
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        res.status(400).json({ success: false, message: "User Already Exists! Please Login" });
    }
    else {
        const picture = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E"
        const user = await User.create({ name, email, password, picture })
        const userResponse = {
            ...user.toJSON(),
            password: undefined,
        };
        if (user) {
            const token = await generateToken(user._id)
            res.status(200).json({ success: true, message: "User Created Successfully! Redirecting...", token, user: userResponse });
        }
        else {
            res.status(400).json({ success: false, message: "Unable to create user!" });
        }
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email && !password) {
        res.status(400).json({ success: false, message: "Please Enter all The Fields!" });
        return;
    }
    const user = await User.findOne({ email });
    if (user) {
        if (await user.matchPassword(password)) {
            const token = await generateToken(user._id)
            const userResponse = {
                ...user.toJSON(),
                password: undefined,
            };
            res.status(200).json({ success: true, message: "Login successful", token, user: userResponse });
        }
        else {
            res.status(400).json({ success: false, message: "Invalid Credentials!" });
        }
    }
    else {
        res.status(400).json({ success: false, message: "User Not Found!!!" });
    }
})

const myEvents = asyncHandler(async (req, res) => {
    if (!req.body.id) {
        res.status(200).json({ success: false, message: "Please Enter all The Fields!" });
        return;
    }
    const bookings = await Booking.find({ userid: req.body.id }).populate('eventid')
    bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ myEvents: bookings })
})

const bookevent = asyncHandler(async (req, res) => {
    const { userid, userName, eventid, ticketNumber } = req.body;

    try {
        const user = await User.findById(userid)
        AWS.config.update({
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.ACCESS_SECRET,
            region: 'ap-south-1'
        })

        const rekognition = new AWS.Rekognition();

        rekognition.listCollections(async (err, data) => {
            if (err) {
                res.status(400);
                return;
            }
            if (data.CollectionIds.includes(process.env.FACE_COLLECTION)) {
                if (!user.hasUserId) {
                    rekognition.createUser({
                        "CollectionId": process.env.FACE_COLLECTION,
                        "UserId": userid
                    }, async (err, data) => {
                        if (err) {
                            res.status(400);
                            return;
                        }
                        rekognition.indexFaces({
                            Image: {
                                "Bytes": req.file.buffer
                            },
                            CollectionId: process.env.FACE_COLLECTION,
                            MaxFaces: 1,
                            QualityFilter: "AUTO",
                        }, async (err, data) => {
                            if (err) {
                                res.status(400);
                                return;
                            }
                            rekognition.associateFaces({
                                "CollectionId": process.env.FACE_COLLECTION,
                                "UserId": userid,
                                "FaceIds": [data.FaceRecords[0].Face.FaceId]
                            }, async (err, data) => {
                                if (err) {
                                    res.status(400);
                                    return;
                                }
                                if (data.AssociatedFaces.length > 0) {
                                    User.findByIdAndUpdate(userid, {
                                        hasUserId: true,
                                        associatedFaces: data.AssociatedFaces.length
                                    })
                                    await Booking.create({ userid, userName, eventid, ticketNumber })
                                    res.json({ success: true, message: "Booking Created!!!"})
                                    return;
                                }
                                else {
                                    console.log("Face Not Associated!")
                                    res.status(200).json({ success: false, message: "Face Not Associated!"})
                                    return;
                                }
                            })
                        })
                    })
                }
                else {
                    await Booking.create({ userid, userName, eventid, ticketNumber })
                    res.status(200).json({ success: true, message: "Booking Created!!!" });
                }
            }
            else {
                console.error("Collection Not Found")
                res.status(200).json({ success: false, message: "Collection Not Found" });
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error })
    }
})

module.exports = { registerUser, loginUser, bookevent, myEvents }
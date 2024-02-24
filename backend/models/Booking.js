const mongoose = require('mongoose')

const { Schema } = mongoose;
const bookingSchema = new Schema({
  eventid: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: "events",
    required: true
  },
  userid: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  isValidated: {
    type: Boolean,
    default: false
  },
  userName: {
    type: String,
    required: true
  },
  ticketNumber: {
    type: Number,
    default: 1
  }
}, {timestamps: true});


mongoose.models = {}
const Booking = mongoose.model('bookings', bookingSchema)
module.exports = Booking
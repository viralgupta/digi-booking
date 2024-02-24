const mongoose = require('mongoose')

const { Schema } = mongoose;
const eventSchema = new Schema({
  name: {
    type:  String,
    required: true
  },
  about: {
    type:  String,
    required: true
  },
  type: {
    type:  String,
    required: true
  },
  picture: {
    type: String,
    default: "https://d23qowwaqkh3fj.cloudfront.net/wp-content/uploads/2023/07/338966889_776249000358676_7405975566157723842_n-1-e1689323456835.jpg"
  },
  userId: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  }
}, {timestamps: true});


mongoose.models = {}
const Event = mongoose.model('events', eventSchema)
module.exports = Event
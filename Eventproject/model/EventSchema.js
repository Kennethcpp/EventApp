
const mongoose = require("mongoose")
const timestamp = require("timestamp")
const Users = require("../model/userSchema")

// Define schema for Event
const EventSchema = new mongoose.Schema({
       
    title: {
      type: String,
      require: true
     
    },
    description: {
      type: String,
      require: true
    },
    date: {
      type: String,
      require: true
    },
    location: {
      type: String,
      require: true
    },
    organizer: {
      type: String,
      require: true
    },
    participants: [{
      type: Array,
      require: true
    }],
    rsvps: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      response: {
        type: String,
        enum: ['yes', 'no', 'maybe']
      }
    }],
    created_at:{
      type: Date,
      default: Date.now,
      }
  });
     

      



const Event = new mongoose.model("Event", EventSchema)

module.exports = Event
 
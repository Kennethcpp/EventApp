

const mongoose = require("mongoose")



const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  role: {
    type: String,
    enum: ['organizer', 'participant'],
    default: 'participant'
  }
});
  

const Users = new mongoose.model("Users", userSchema)

module.exports = Users
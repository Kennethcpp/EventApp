
const express = require("express")

const {registerUser, loginUsers, getAllUsers, getOneUser, forgetPassword, resetPassword, deleteUser } = require("../control/regcontrol")

const {handleCreateEvents, handleGetAllEvent, handleGetOneEvent,
     handlUpdateEvent, handledeleteEvent, handleRsvps } = require("../control/eventControl")
const {validateReg, validatelogin, validateForgotPassword, validateDeletedUser, } = require("../routes/middleware")







const app = express.Router()
 
    app.post("/register", validateReg, registerUser)

    app.post("/login", validatelogin, loginUsers)

    app.get("/get-allUser", getAllUsers)

    app.get("/get-oneUser/:id", getOneUser)

    app.post("/forget-password", validateForgotPassword, forgetPassword)

    app.post("/reset-password", resetPassword)

    app.delete("/delete-user/:id", validateDeletedUser, deleteUser)

    

    

   app.post("/create-event", handleCreateEvents) 

   app.get("/allevent",  handleGetAllEvent)

   app.get("/get-one-event/:id",  handleGetOneEvent)

   app.patch("/update-event/:id",  handlUpdateEvent)

   app.delete("/delete-event/:id",  handledeleteEvent)

   app.post("/events/:id/rsvp", handleRsvps)

   


 



 
module.exports = app
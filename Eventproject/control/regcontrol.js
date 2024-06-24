const Users = require("../model/userSchema")
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")




//REGISTER A USER
const registerUser = async(req, res)=>{

 try{
  const {email, username, password, role} = req.body

    const ExistingUser = await Users.findOne({email})
       if(ExistingUser){
        return res.status(401).json({
          message: "User already Exist!"
        })

       }
      //hashe the password and set new password to be hashed password
      const hashedPassword = await bcrypt.hash(password, 12)

      const user = new Users({email, username, password: hashedPassword, role})
    
        await user.save()
  
          return res.status(200).json({ 
              message: "successful",
              user: {email, username,role }    
      })  
    



 } catch (error) {
  return res.status(500).json({message: error.message})
} 

  
  }
  
  //login user
const loginUsers = async(req, res)=>{

    try{

      const {email, password} = req.body

    const User = await Users.findOne({email})
    if(!User){
      return res.status(400).json({
        message: "User not found."
      })
    }
// checking password match

const matchPassword = await  bcrypt.compare(password, User.password)
if(!matchPassword){
  return res.status(400).json({
    message: "Incorrect Email or Password."
  })
  }  
//generate pass token to grant user access using jsonwebtoken

const userPayload = {
  id: User._id,
  email: User.email
}
const passToken = await jsonwebtoken.sign(userPayload, process.env.PASSTOKEN,
   {expiresIn: '5d'})
   

return res.status(200).json({
  message: "login successful",
  passToken,
  User
})

    } catch (error) {
    return res.status(500).json({message: error.message})
  } 

    }
  
const getAllUsers = async (req, res)=>{

  try{

    const user = await Users.find()
    return res.status(200).json({
      message: "successful",
      count: user.length,
      user
    })
  } catch (error) {
    return res.status(500).json({message: error.message})
  } 
}
const getOneUser = async(req, res)=>{
  try{ 
    const {id} = req.params
    const user = await Users.findById(id)
    return res.status(200).json({
      message: "successful",
      user
    })


  } catch (error){
    return res.status(500).json({message: error.message})
  }
}
    //forgot password
const forgetPassword = async(req, res)=>{

      try{
        const { email } = req.body
      const User = await Users.findOne({email})
      
    
    const userPayload = {
      userPayload: User.passToken,
      email: User.email
    }
    if(!User.passToken){
      return res.status(400).json({message: "access denied"})
    }
    //generate passToken 
    const passToken = jsonwebtoken.sign(userPayload, process.env.PASSTOKEN, {expiresIn: '30m'})

    //send an email to user with the url and passtoken
    //const websiteURL = `youthrive.com/${passToken}`
    
    //send  email to user with the reset password url

    return res.status(200).json({
      message: "successful."
    }) 
    
      } catch (error) {
        return res.status(500).json({message: error.message})
      }
    }

//reset password
const resetPassword = async(req, res)=>{
  try{
    const {password, email} = req.body
    const User = await Users.findOne({email})
    if(!User){
      res.status(200).json({
        message: "User not found"
      })
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    User.password = hashedPassword
    await User.save()
    res.status(200).json({
      message: "password reset was successful"
    })
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

//DELETE ONE USER
  const deleteUser = async(req, res)=>{
    try{

      const { id } = req.params
    const deletedUser = await Users.findByIdAndDelete(id)

    return res.status(200).json({
      message: "deleted successfully."
    })
    } catch (error) {
      return res.status(500).json({message: error.message})
    }
  }







module.exports = {
  registerUser,
  loginUsers,
  getAllUsers,
  getOneUser,
  forgetPassword,
  resetPassword,
  deleteUser,


}
 
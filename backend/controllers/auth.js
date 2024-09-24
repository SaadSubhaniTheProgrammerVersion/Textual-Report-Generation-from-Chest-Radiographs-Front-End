import User from "../models/User.js";
import bcrypt from "bcryptjs"

export const Register = async(request, response) => {
  console.log("HERE")
  const{name,email,password} = request.body
  const existingUser = await User.findOne({email:email})
  console.log(existingUser)
  if (existingUser){
    response.status(400).send("User Already Exists"); 
  }

//   const hashedPassword = await bcrypt.hash(password, "5")

  const newUser = new User({
    name: name,
    email: email,
    password: password
  })
  try {
    const createdUser = await User.create(newUser)
    console.log(createdUser)
    response.status(200).send(createdUser)
  } catch (err) {
    response.status(500).send("An Error Occurred: " + err)
  }
}


export const Login = async(req,res) => {
  const {email,password} = req.body
  const existingUser = await User.findOne({email:email})
  
  if(!existingUser){
    res.status(401).send("Invalid Credentials")
  }

  if(existingUser){
    if (password!=existingUser.password){
        res.status(401).send("Invalid Credentials")
    }

    if (existingUser.password == password){
        console.log(existingUser)
        res.status(200).send(existingUser)
    }
  }

}
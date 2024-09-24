import User from "../models/User.js";

export const Register = async(request, response) => {
  console.log("HERE")
  const{name,email,password} = request.body
  const existingUser = await User.findOne({email:email})

  if (existingUser){
    return new response("The Email is Already in Use. ", {status: 400}); 
  }

  const hashedPassword = await bcrypt.hash(password,5)

  const newUser = new User({
    name: name,
    email: email,
    password: hashedPassword
  })

  try {
    await new User.save(newUser)
    response.send({msg: "User Added"}, 200)
  } catch (err) {
    response.send(err, 500)
  }
}


export const Login = (req,res) => {
  
}
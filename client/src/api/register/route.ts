import User from '../../models/User'
import dbConnection from '../../lib/db'
import bcrypt from 'bcryptjs'
// import { NextApiResponse } from 'next'
import {NextResponse} from "next/server"


export const post = async(request) => {
  console.log("HERE")
  const{name,email,password} = await request.json()
  await dbConnection();

  const existingUser = await User.findOne({email:email})
  if (existingUser){
    return new NextResponse("The Email is Already in Use. ", {status: 400}); 
  }

  const hashedPassword = await bcrypt.hash(password,5)

  const newUser = new User({
    name: name,
    email: email,
    password: hashedPassword
  })

  try {
    await new User.save(newUser)
    return new NextResponse("The User is Registered", {status: 200})
  } catch (err:any) {
    return new NextResponse(err, {
      status: 500
    });
  }
}




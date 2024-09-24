import express, { json } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose";
import dotenv from 'dotenv'
// import userRoutes from "./routes/authentication.js"

const app = express();
dotenv.config();
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors(corsOptions))
// app.use("/user", userRoutes)

const conn_url = process.env.MONGO_URI


mongoose.connect(conn_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(5000, () => console.log("Server Listening and Connected to DB")))
    .catch((error) => console.log(error.message))
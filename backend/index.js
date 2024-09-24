import express, { json } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRoutes from "./routes/authentication.js"
import multer from "multer";
import Report from "./models/Report.js";
import { readFileSync } from "fs";

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
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads'); // Destination folder where images will be stored
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname + '-' + Date.now()); // Use original file name for the uploaded image
    }
  });
  
const upload = multer({storage: storage})

app.get('/getReports', async(req,res)=>{
    const docId = req.query.id
    try{
        const reports = await Report.find({doctorsID: docId})
        // console.log(reports)
        res.status(200).send(reports)
    }
    catch(error){
        console.log(error)
        res.status(406).send(error)
    }
})

app.post('/saveReport', upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 }
  ]), async (req, res) => {
    const filePath = req.files['image1'][0].path;
    const img1data = readFileSync(req.files['image1'][0].path)
    if(req.files['image2']){ 
    const img2data = readFileSync(req.files['image2'][0].path)}
        const report = new Report({
            doctorsID: req.body.doctorId, // Assuming doctorId is sent in the request body
            patientName: req.body.patientName,
            Diagnosis: req.body.report,
            Image1: {
                data: img1data,
                contentType: req.files['image1'][0].mimetype
        },
        // Check if image2 is uploaded
        Image2: req.files['image2'] ? {
            data: readFileSync(req.files['image2'][0].path),
            contentType: req.files['image2'][0].mimetype
        } : null
    })
    console.log(report)
    try{
    const addedReport = await Report.create(report)
    // console.log(addedReport)
    res.status(200).send("Uploaded Successfully")
    }
    catch (error){
        console.log(error)
        res.status(500).send(error)
    }

  });


app.use("/user", userRoutes)

const conn_url = process.env.MONGO_URI


mongoose.connect(conn_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(5000, () => console.log("Server Listening and Connected to DB")))
    .catch((error) => console.log(error.message))
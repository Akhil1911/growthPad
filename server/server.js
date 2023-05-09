import express from 'express'
import dotenv from 'dotenv'
import connectionDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import tuitionRoutes from './routes/tuitionRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express()
//confid dotenv
dotenv.config()
const port = process.env.PORT || 1911
//connect DB
connectionDB();

//middleware
app.use(express.json())
app.use(cors());
app.use(cookieParser())
//using Routes
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/tuition", tuitionRoutes);

//Listening to a Port number 
app.listen(port,()=>{
    console.log(`Listening..... ${port}`)
})

//home page demo
app.get('/getToken',(req,res)=>{
    console.log(req.cookies("token"));
    return req.cookies.token
})
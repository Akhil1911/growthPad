import express from 'express'
import dotenv from 'dotenv'
import connectionDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import cors from 'cors'
const app = express()
//confid dotenv
dotenv.config()
const port = process.env.PORT || 1911

//connect DB
connectionDB();

//middleware
app.use(express.json())
app.use(cors());
//using Routes
app.use("/api/v1/auth",authRoutes)

//Listening to a Port number 
app.listen(port,()=>{
    console.log(`Listening..... ${port}`)
})

//home page demo
app.get("/",(req,res)=>{
    res.send("<h1>Hello World</h1>")
})
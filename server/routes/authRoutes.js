import express from 'express'
import { loginController, registerController, stdRegisterController, studentLoginController } from '../controllers/authControllers.js'

const router = express.Router()

//Tuitioin Class Registration Route
router.post("/register",registerController)
//Tuition class login
router.post("/login",loginController)
//Student Register
router.post("/studentregister",stdRegisterController)
//Studen login 
router.post("/studentlogin",studentLoginController)
export default router
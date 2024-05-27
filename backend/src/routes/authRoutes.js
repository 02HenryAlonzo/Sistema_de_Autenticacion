import express from 'express'
import { registerUser, loginUser } from '../controllers/authController.js'
import { validateEmail, validatePassword } from '../middlewares/validateInfo.js'
import { checkCredentials, checkUserExists } from '../middlewares/checkInfo.js'

const router = express.Router()

// Ruta de registro de usuarios
router.post('/register', validateEmail, validatePassword, checkUserExists, registerUser)
// Ruta de inicio de sesión de usuarios
router.post('/login', validateEmail, checkCredentials, loginUser)

export default router

import express from 'express'
import { getProfile, updateProfile } from '../controllers/profileController.js'
import authenticateToken from '../middlewares/authenticateToken.js'
import { upload } from '../middlewares/multerConfig.js'

const router = express.Router()

// Ruta para obtener la información del perfil
router.get('/profile', authenticateToken, getProfile)

// Ruta para actualizar la información del perfil
router.put('/profile', authenticateToken, upload.single('profilePicture'), updateProfile)

export default router

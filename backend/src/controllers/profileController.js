import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcrypt'
import { getUserById, updateUserProfile, findUserByEmail } from '../models/userModel.js'

// Función para obtener el perfil de un usuario
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId
    const user = await getUserById(userId)
    delete user.password

    res.json(user)
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error)
    res.status(500).json({ message: 'Error en el servidor' })
  }
}

// Función para actualizar el perfil de un usuario
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId
    const { username, email, password, birthDate, bio, location, socialMedia } = req.body
    const profilePicture = req.file

    // Obtener el perfil actual del usuario
    const currentUser = await getUserById(userId)
    if (!currentUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    // Validar el correo electrónico si se proporciona uno nuevo
    if (email && email !== currentUser.email) {
      // Validar el formato del correo electrónico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'El formato del correo electrónico no es válido.' })
      }

      // Verificar que el correo electrónico no esté ya registrado
      const existingUser = await findUserByEmail(email)
      if (existingUser.length > 0) {
        return res.status(400).json({ message: 'El correo electrónico ya está registrado.' })
      }
    }

    // Validar la contraseña si se proporciona
    if (password) {
      if (password.length < 8 || !/[A-Z]/.test(password)) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres y una letra mayúscula.' })
      }
    }

    // Cifrar la contraseña si se proporciona
    let hashedPassword = currentUser.password
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10)
    }

    // Manejar la imagen de perfil
    let profilePicturePath = currentUser.profile_picture
    if (profilePicture) {
      // Eliminar la imagen anterior si existe
      if (currentUser.profile_picture) {
        const oldPicturePath = path.join(__dirname, '../..', currentUser.profile_picture)
        if (fs.existsSync(oldPicturePath)) {
          fs.unlink(oldPicturePath, (err) => {
            if (err) {
              console.error('Error al eliminar la imagen anterior:', err)
            } else {
              console.log('Imagen anterior eliminada correctamente:', oldPicturePath)
            }
          })
        } else {
          console.log('La imagen anterior no existe en la ruta:', oldPicturePath)
        }
      }
      // Guardar la nueva ruta de la imagen
      profilePicturePath = `uploads/${profilePicture.filename}`
    }

    // Actualizar el perfil del usuario con los datos proporcionados
    const updatedUser = {
      username: username || currentUser.username,
      email: email || currentUser.email,
      password: hashedPassword,
      birth_date: birthDate || currentUser.birth_date,
      bio: bio || currentUser.bio,
      location: location || currentUser.location,
      social_media: socialMedia || currentUser.social_media,
      profile_picture: profilePicturePath
    }

    await updateUserProfile(userId, updatedUser)

    // Preparar el objeto actualizado para la respuesta
    const responseUser = {
      username: updatedUser.username,
      email: updatedUser.email,
      birthDate: updatedUser.birth_date,
      bio: updatedUser.bio,
      location: updatedUser.location,
      socialMedia: updatedUser.social_media,
      profilePicture: updatedUser.profile_picture
    }

    res.json({ message: 'Perfil actualizado con éxito', user: responseUser })
  } catch (error) {
    console.error('Error al actualizar el perfil del usuario:', error)
    res.status(500).json({ message: 'Error en el servidor' })
  }
}

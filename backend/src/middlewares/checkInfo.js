import bcrypt from 'bcrypt'
import { findUserByEmail } from '../models/userModel.js'

export const checkCredentials = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await findUserByEmail(email)

    if (user.length === 0) {
      return res.status(400).json({ message: 'Correo electrónico incorrecto' })
    }

    const validPassword = await bcrypt.compare(password, user[0].password)

    if (!validPassword) {
      return res.status(400).json({ message: 'Contraseña incorrecta' })
    }

    req.user = user[0]
    next()
  } catch (error) {
    console.error('Error al verificar las credenciales:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export const checkUserExists = async (req, res, next) => {
  const { email } = req.body

  try {
    const existingUser = await findUserByEmail(email)

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'El correo electrónico ya existe' })
    }

    next()
  } catch (error) {
    console.error('Error al verificar si el usuario existe:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

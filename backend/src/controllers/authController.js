import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createUser, findUserByEmail } from '../models/userModel.js'
import { config } from '../config/config.js'

// Función para registrar un nuevo usuario
export const registerUser = async (req, res) => {
  const { email, password } = req.body

  try {
    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Crear el nuevo usuario
    await createUser(email, hashedPassword)

    res.status(201).json({ message: 'Usuario registrado exitosamente' })
  } catch (error) {
    console.error('Error al registrar el usuario:', error)
    res.status(500).json({ message: 'Error al registrar el usuario' })
  }
}

// Función para iniciar sesión
export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await findUserByEmail(email)

    if (user.length === 0) {
      return res.status(400).json({ message: 'Correo electrónico incorrecto.' })
    }

    const validPassword = await bcrypt.compare(password, user[0].password)

    if (!validPassword) {
      return res.status(400).json({ message: 'Contraseña incorrecta.' })
    }

    const token = jwt.sign({ userId: user[0].id }, config.jwtSecret, { expiresIn: '1h' })

    res.status(200).json({ message: 'Inicio de sesión exitoso', token })
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
    res.status(500).json({ message: 'Error al iniciar sesión' })
  }
}

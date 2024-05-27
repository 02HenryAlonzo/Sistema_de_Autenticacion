import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' })
  }

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token no válido' })
    }

    req.user = user
    next()
  })
}

export default authenticateToken

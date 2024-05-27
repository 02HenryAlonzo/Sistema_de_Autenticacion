import dotenv from 'dotenv'
dotenv.config()

export const config = {
  port: process.env.PORT,
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_DATABASE // Asegúrate de que sea DB_DATABASE y no DB_NAME
  },
  jwtSecret: process.env.JWT_SECRET
}

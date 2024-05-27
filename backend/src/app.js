import express from 'express'
import cors from './config/cors.js'
import authRoutes from './routes/authRoutes.js'
import protectedRoutes from './routes/profileRoutes.js'
import { config } from './config/config.js'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger-output.json' assert { type: 'json' }


// Crear una instancia de Express
const app = express()

// Middleware para parsear JSON
app.use(express.json())

app.use(cors)

// Ruta de bienvenida en la raíz de la aplicación
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la aplicación de autenticación!')
})

// Usar las rutas de autenticación
app.use('/api/auth', authRoutes)
app.use('/api', protectedRoutes)

// Servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static('uploads'))

// Configuración de Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const PORT = config.port || 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
  console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`)
})

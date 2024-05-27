import multer from 'multer'

// Configuración de Multer para almacenar las imágenes en una carpeta local
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const fileFilter = (req, file, cb) => {
  // Aceptar solo archivos de imagen
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Formato de archivo no válido. Por favor suba una imagen.'), false)
  }
}

export const upload = multer({ storage, fileFilter })

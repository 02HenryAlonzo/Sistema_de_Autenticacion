export const validateEmail = (req, res, next) => {
  const { email } = req.body
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!re.test(email)) {
    return res.status(400).json({ message: 'Correo electrónico inválido.' })
  }

  next()
}

export const validatePassword = (req, res, next) => {
  const { password } = req.body

  if (password.length < 8 || !/[A-Z]/.test(password)) {
    return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres y una letra mayúscula.' })
  }

  next()
}

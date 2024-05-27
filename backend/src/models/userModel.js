import pool from '../config/db.js'

// Función para encontrar un usuario por correo electrónico
export const findUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
  return rows
}

// Función para crear un nuevo usuario
export const createUser = async (email, password) => {
  const [result] = await pool.query(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, password]
  )
  return result
}

// Función para obtener un usuario por su ID
export const getUserById = async (userId) => {
  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE id = ?',
    [userId]
  )
  return rows[0]
}

// Función para actualizar el perfil de un usuario
export const updateUserProfile = async (id, userData) => {
  const fields = []
  const values = []

  for (const [key, value] of Object.entries(userData)) {
    if (value !== undefined) {
      fields.push(`${key} = ?`)
      values.push(value)
    }
  }

  values.push(id)

  const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`
  await pool.query(query, values)
}

import axios from "axios"

/*preliminary work to get API
connectivity with axios */

const API_URL = ""

// Login request
export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password })
  return response.data
}

// Registration request
export const register = async (
  email: string,
  password: string,
  username: string
) => {
  const response = await axios.post(`${API_URL}/register`, {
    email,
    password,
    username,
  })
  return response.data
}

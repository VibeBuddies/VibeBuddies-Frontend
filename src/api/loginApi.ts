import axios from "axios"

/* preliminary work to get the api
connectivity */
const API_URL = ""

// Login request
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password })
    return response.data // will need to tweak to get the token probably
  } catch (error) {
    throw new Error("Login failed")
  }
}

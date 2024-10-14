import axios from "axios"

/* preliminary work to get the api
connectivity */
const API_URL = "http://35.172.116.68:3000"

// Login request
export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    })
    return response.data
  } catch (error) {
    throw new Error("Login failed")
  }
}

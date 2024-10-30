import axios from "axios"
import { API_URL } from "../utils/APIURL"

/**
 * api function call to log in a user
 *
 */

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

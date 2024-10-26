import axios from "axios"
import { API_URL } from "../utils/APIURL"

// Register user API call
export const register = async (data: {
  username: string
  password: string
  email: string
}) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data)
    return response
  } catch (error) {
    throw new Error("Failed to register user")
  }
}

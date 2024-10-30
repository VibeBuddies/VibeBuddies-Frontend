import axios from "axios"
import { API_URL } from "../utils/APIURL"

/**
 * api function call to get a user by their username
 *
 */
const getUserByUsername = async (username: string) => {
  try {
    const token = localStorage.getItem("token")

    if (!token) {
      throw new Error("No token found, please log in.")
    }

    const response = await axios.get(`${API_URL}/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw new Error("failed to retrieve vibeChecks by id")
  }
}

export default getUserByUsername

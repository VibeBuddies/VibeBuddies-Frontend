import axios from "axios"
import { API_URL } from "../utils/APIURL"

/**
 *
 * get all vibe checks for a given user by username
 */

//get all vibe checks for a given user by username
const getAllVibeChecksByUsername = async (username: string) => {
  try {
    //fetching the token
    const token = localStorage.getItem("token")

    if (!token) {
      throw new Error("No token found, please log in.")
    }

    const response = await axios.get(
      `${API_URL}/vibe-checks/username/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error("Error in getAllVibeChecksById: ", error)
    throw new Error("Failed to retrieve vibeChecks by id")
  }
}

export default getAllVibeChecksByUsername

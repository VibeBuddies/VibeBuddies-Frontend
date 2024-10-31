import axios from "axios"
import { API_URL } from "../utils/APIURL"

/**
 * 
 * 
 *  axios file to hanlde the api call needed
  to get all vibechecks by ID
 */

//get all vibe checks for a given user
const getAllVibeChecksById = async (userId: string) => {
  try {
    const token = localStorage.getItem("token")

    if (!token) {
      throw new Error("No token found, please log in.")
    }

    const response = await axios.get(`${API_URL}/vibe-checks/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error("Error in getAllVibeChecksById: ", error)
    throw new Error("Failed to retrieve vibeChecks by id")
  }
}

export default getAllVibeChecksById

import axios from "axios"
import { API_URL } from "../utils/APIURL"

const token = localStorage.getItem("token")

//get all vibe checks for a given user
const getAllVibeChecksById = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/vibe-checks/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw new Error("failed to retrieve vibeChecks by id")
  }
}

export default getAllVibeChecksById

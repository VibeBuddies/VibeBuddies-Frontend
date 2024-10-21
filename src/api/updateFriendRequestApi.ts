import axios from "axios"
import { API_URL } from "../utils/APIURL"

const token = localStorage.getItem("token")

// update the status of a friend request
const updateFriendRequest = async (username: string, status: string) => {
  try {
    const response = await axios.patch(
      `${API_URL}/friends`,
      {
        username,
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error("failed to update friend request:", error)
    throw error
  }
}

export default updateFriendRequest

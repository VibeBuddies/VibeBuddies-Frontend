import axios from "axios"

const API_URL = "http://35.172.116.68:3000"
const token = localStorage.getItem("token")

// Update the status of a friend request
const updateFriendRequest = async (username: string, status: string) => {
  try {
    const response = await axios.patch(
      `${API_URL}/friends`,
      {
        username,
        status, // "accepted" or "rejected"
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error("Failed to update friend request:", error)
    throw error
  }
}

export default updateFriendRequest

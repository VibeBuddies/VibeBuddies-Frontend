import axios from "axios"
import { API_URL } from "../utils/APIURL"

/**
 * api function call to send a friend request
 *
 */

async function sendFriendRequest(username: string): Promise<void> {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("No token found, please log in.")
    }

    //sending post request to /friends
    await axios.post(
      `${API_URL}/friends`,
      { username },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  } catch (error) {
    throw new Error(`failed to send friend request to ${username}, ${error}`)
  }
}

export default sendFriendRequest

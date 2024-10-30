import axios from "axios"
import { API_URL } from "../utils/APIURL"

/**
 * api function call to handle the
 * retrival of pending friend requests
 *
 */

const getPendingFriends = async () => {
  try {
    const token = localStorage.getItem("token")

    if (!token) {
      throw new Error("No token found, please log in.")
    }

    //get request
    const response = await axios.get(`${API_URL}/friends?status=pending`, {
      headers: {
        //attaching the token
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw new Error("failed to retrieve friends")
  }
}

export default getPendingFriends

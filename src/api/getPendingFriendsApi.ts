import axios from "axios"
import { API_URL } from "../utils/APIURL"

const token = localStorage.getItem("token")

//get all friends request, needs a jwt
const getPendingFriends = async () => {
  try {
    const response = await axios.get(`${API_URL}/friends?status=pending`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw new Error("failed to retrieve friends")
  }
}

export default getPendingFriends

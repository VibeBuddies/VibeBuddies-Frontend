import axios from "axios"
import { API_URL } from "../utils/APIURL"

const token = localStorage.getItem("token")

//get all vibe checks for a given user
const getUserByUsername = async (username: string) => {
  try {
    const response = await axios.get(`${API_URL}/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log("here is your DATA!: ", response.data)
    return response.data
  } catch (error) {
    throw new Error("failed to retrieve vibeChecks by id")
  }
}

export default getUserByUsername

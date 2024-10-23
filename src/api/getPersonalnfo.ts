import axios from "axios"
import { API_URL } from "../utils/APIURL"

const getPersonalInformation = async (username: string) => {
  // function to get the user's personal informaiton from the backend

  const token = localStorage.getItem("token")

  if (!token) {
    throw new Error("No token found, please log in.")
  }

  try {
    // Send GET request
    const response = await axios.get(`${API_URL}/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response
  } catch (error) {
    console.error("Error getting personal information:", error) // Log any error that occurs
  }
}

export default getPersonalInformation

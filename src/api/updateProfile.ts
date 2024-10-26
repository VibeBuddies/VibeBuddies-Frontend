import axios from "axios"
import { API_URL } from "../utils/APIURL"

const updatePersonalProfile = async (profileData: any) => {
  // function to get the user's personal informaiton from the backend
  try {
    const token = localStorage.getItem("token")

    if (!token) {
      throw new Error("No token found, please log in.")
    }
    // Send GET request
    const response = await axios.patch(`${API_URL}/users`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response
  } catch (error) {
    console.error("Error getting personal information:", error) // Log any error that occurs
  }
}

export default updatePersonalProfile

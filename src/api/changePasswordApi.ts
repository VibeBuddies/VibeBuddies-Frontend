import axios from "axios"
import { API_URL } from "../utils/APIURL"

/* axios file to hanlde the api call needed
 for the user to change their password */

const sendChangePassword = async (
  token: string | null,
  currentPassword: string,
  newPassword: string
) => {
  const data = { currentPassword, newPassword } //patch needs a data in the body regardless of if the service method actually needs it
  try {
    // Send patch request
    const response = await axios.patch(`${API_URL}/users/password`, data, {
      headers: {
        Authorization: `Bearer ${token}`, //adding the token to the request
        "Content-Type": "application/json",
      },
    })

    return response.data
  } catch (error) {
    console.error("Error submitting the form:", error)
  }
}

export default sendChangePassword

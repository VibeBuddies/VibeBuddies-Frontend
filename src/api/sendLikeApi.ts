import axios from "axios"
import { API_URL } from "../utils/APIURL"

/**
 * api function call to send a like to a vibecheck
 *
 */
const sendLike = async (token: string | null, vibe_check_id: string) => {
  if (vibe_check_id) {
    const data = {}
    try {
      // Send PATCH request
      //patch needs a data in the body regardless of if the service method actually needs it
      const response = await axios.patch(
        `${API_URL}/vibe-checks/${vibe_check_id}/like`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, //adding the token to the headers
            "Content-Type": "application/json",
          },
        }
      )
      return response.data
    } catch (error) {
      console.error("Error submitting the form:", error)
    }
  }
}

export default sendLike

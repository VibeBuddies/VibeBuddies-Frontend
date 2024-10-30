import axios from "axios"
import { SelectedAlbum } from "../types"
import { API_URL } from "../utils/APIURL"

/**
 * api function call to create a vibecheck
 *
 */

const sendCreateVibeCheck = async (
  token: string | null,
  isFormValid: boolean,
  selectedAlbum: SelectedAlbum | null,
  review: string,
  rating: number | null
) => {
  if (isFormValid) {
    const data = {
      album_id: selectedAlbum,
      review: review,
      rating: rating,
    }

    try {
      // Send POST request
      const response = await axios.post(`${API_URL}/vibe-checks`, data, {
        headers: {
          Authorization: `Bearer ${token}`, //adding the token to the headers
          "Content-Type": "application/json",
        },
      })
      return response.data
    } catch (error) {
      console.error("Error submitting the form:", error)
    }
  }
}

export default sendCreateVibeCheck

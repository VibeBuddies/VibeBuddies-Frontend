import axios from "axios"
import { API_URL } from "../utils/APIURL"

async function deleteVibeCheck(vibeCheckId: string): Promise<void> {
  /**
   * api function to handle the deleting of a friend
   *
   */

  try {
    const token = localStorage.getItem("token")
    await axios.delete(`${API_URL}/vibe-checks/${vibeCheckId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    throw new Error(`failed to delete vibe check ${vibeCheckId}`)
  }
}

export default deleteVibeCheck

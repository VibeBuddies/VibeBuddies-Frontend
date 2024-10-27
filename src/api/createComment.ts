import axios from "axios"
import { API_URL } from "../utils/APIURL"

const createComment = async (vibe_check_id: string, comment_body: string) => {
  try {
    const token = localStorage.getItem("token")

    if (!token) {
      throw new Error("No token found, please log in.")
    }

    const response = await axios.patch(
      `${API_URL}/vibe-checks/comments`,
      { vibe_check_id, comment_body },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    console.log("here is the DATA: ", response.data)
    return response.data
  } catch (error) {
    throw new Error("failed to create comment")
  }
}

export default createComment

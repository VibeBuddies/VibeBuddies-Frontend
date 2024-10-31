import axios from "axios"
import { API_URL } from "../utils/APIURL"

/* axios file to hanlde the api call needed
 for the user to create a comment on a vibecheck */

const createComment = async (vibe_check_id: string, comment_body: string) => {
  try {
    const token = localStorage.getItem("token")

    if (!token) {
      throw new Error("No token found, please log in.")
    }

    //sending a patch request
    const response = await axios.patch(
      `${API_URL}/vibe-checks/comments`,
      { vibe_check_id, comment_body },
      {
        headers: {
          //attaching the token
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

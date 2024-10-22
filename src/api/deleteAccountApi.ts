import axios from "axios"
import { API_URL } from "../utils/APIURL"

const token = localStorage.getItem("token")

const deleteAccount = async () => {
  try {
    const response = await axios.delete(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log("here is the DATA: ", response.data)
    return response.data
  } catch (error) {
    throw new Error("failed to delete account")
  }
}

export default deleteAccount

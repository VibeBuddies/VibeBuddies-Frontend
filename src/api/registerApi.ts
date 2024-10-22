import axios from "axios"
import { API_URL } from "../utils/APIURL"

/*preliminary work to get API
connectivity with axios */

// Registration request
export const register = async (
  email: string,
  password: string,
  username: string
) => {
  const response = await axios.post(`${API_URL}/register`, {
    username,
    password,
    email,
  })
  return response.data
}

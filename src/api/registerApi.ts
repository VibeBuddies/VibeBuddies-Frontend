import axios from "axios"

/*preliminary work to get API
connectivity with axios */

const API_URL = ""

// Registration request
export const register = async (
  email: string,
  password: string,
  username: string
) => {
  const response = await axios.post(`${API_URL}/register`, {
    email,
    password,
    username,
  })
  return response.data
}

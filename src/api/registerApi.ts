import axios from "axios"

/*preliminary work to get API
connectivity with axios */

const API_URL = "http://35.172.116.68:3000"

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

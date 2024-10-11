import axios from "axios"

/*preliminary work to get API
connectivity with axios */

const API_URL = ""

// Create an axios instance with default options (like base URL)
const apiClient = axios.create({
  baseURL: API_URL || "localhost:3000ZzzZzz",
  headers: {
    "Content-Type": "application/json",
  },
})

// Logoff user
export const logoffUser = async () => {
  try {
    const response = await apiClient.post("/logoutOrWhateverTheRouteIs?")
    return response.data
  } catch (error) {
    console.error("Error logging off user:", error)
    throw error
  }
}

// Delete user account
export const deleteUserAccount = async (userId: string) => {
  try {
    const response = await apiClient.delete(`/users/${userId}`)
    return response.data
  } catch (error) {
    console.error("Error deleting user account:", error)
    throw error
  }
}

// Change user password
export const changeUserPassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {
  try {
    const response = await apiClient.put(`/users/${userId}/changePassword`, {
      oldPassword: oldPassword,
      newPassword: newPassword,
    })
    return response.data
  } catch (error) {
    console.error("Error changing password:", error)
    throw error
  }
}

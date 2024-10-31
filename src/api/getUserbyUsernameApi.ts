import axios from 'axios';
import { API_URL } from '../utils/APIURL';
const getUserByUsername = async (username: string) => {
  /**
   * api function call to get a user's info by their username
   *
   */
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found, please log in.');
    }

    const response = await axios.get(`${API_URL}/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`failed to get users info for ${username}`);
  }
};

export default getUserByUsername;

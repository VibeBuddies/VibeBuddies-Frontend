import axios from 'axios';
import { API_URL } from "../utils/APIURL"

const getFriends = async (username: string) => {
  /**
   * function to get the friends of a user
   */

  const token = localStorage.getItem('token');
  try {
    // Send GET request
    const response = await axios.get(
      `${API_URL}/friends/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error('Error getting personal information:', error); // Log any error that occurs
  }
};

export default getFriends;

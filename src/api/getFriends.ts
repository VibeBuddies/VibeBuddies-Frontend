import axios from 'axios';
import { API_URL } from '../utils/APIURL';

const getFriends = async (username: string) => {
  /**
   * api function to handle getting the friends of a given username
   */

  try {
    // getting token
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found, please log in.');
    }

    // Send GET request
    const response = await axios.get(`${API_URL}/friends/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error('Error getting friends:', error); // Log any error that occurs
  }
};

export default getFriends;

import axios from 'axios';
import { API_URL } from '../utils/APIURL';

async function deleteFriend(username: string): Promise<void> {
  /**
   * api function to handle the deleting of a friend
   *
   */

  try {
    // getting toke
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found, please log in.');
    }

    // making axios call to api endpoint and passing username in the uri route
    await axios.delete(`${API_URL}/friends/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error(`failed to delete friend ${username}`);
  }
}

export default deleteFriend;

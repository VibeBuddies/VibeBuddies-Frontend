import axios from 'axios';
import { API_URL } from '../utils/APIURL';

async function sendFriendRequest(username: string): Promise<void> {
  /**
   * api function call to send a friend request
   *
   */
  try {
    // getting token
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found, please log in.');
    }

    // axois call to to send friend request, passes the user's usename in the body
    await axios.post(
      `${API_URL}/friends`,
      { username },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw new Error(`failed to send friend request to ${username}, ${error}`);
  }
}

export default sendFriendRequest;

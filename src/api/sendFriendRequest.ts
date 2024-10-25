import axios from 'axios';
import { API_URL } from '../utils/APIURL';

//get all friends request, needs a jwt
async function sendFriendRequest(username: string): Promise<void> {
  try {
    const token = localStorage.getItem('token');
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

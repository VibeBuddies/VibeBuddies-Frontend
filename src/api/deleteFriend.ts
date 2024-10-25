import axios from 'axios';
import { API_URL } from '../utils/APIURL';

const token = localStorage.getItem('token');

//get all friends request, needs a jwt
async function deleteFriend(username: string): Promise<void> {
  /**
   * api function to handle the deleting of a friend
   *
   */

  try {
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
import axios from 'axios';
import { API_URL } from '../utils/APIURL';

const getAllFriends = async () => {
  /**
   * api function call to handle the retrival of all friends of logged in user
   *
   */
  try {
    // getting token
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found, please log in.');
    }

    const response = await axios.get(`${API_URL}/friends`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error in getAllFriends: ', error);
    throw new Error('Failed to retrieve friends');
  }
};

export default getAllFriends;

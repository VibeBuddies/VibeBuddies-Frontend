import axios from 'axios';
import { API_URL } from '../utils/APIURL';

const getPersonalInformation = async (username: string) => {
  /**
   * api function to handle retrieving data of logged in user
   */

  // getting token
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found, please log in.');
  }

  if (!token) {
    throw new Error('No token found, please log in.');
  }

  try {
    // api endpoint request of user info based on the username
    const response = await axios.get(`${API_URL}/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error('Error getting personal information:', error);
  }
};

export default getPersonalInformation;

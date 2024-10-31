import axios from 'axios';
import { API_URL } from '../utils/APIURL';

const updatePersonalProfile = async (profileData: any) => {
  /**
   * api function to update profile
   */

  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found, please log in.');
    }
    // send GET request
    const response = await axios.patch(`${API_URL}/users`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};

export default updatePersonalProfile;

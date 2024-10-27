import axios from 'axios';
import { API_URL } from '../utils/APIURL';

const updatePersonalProfile = async (profileImageFile: any) => {
  // function to get the user's personal informaiton from the backend
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found, please log in.');
    }

    // form data object to hold the file
    const formData = new FormData();
    formData.append('profileImage', profileImageFile);
    // Send GET request
    const response = await axios.patch(`${API_URL}/users`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error) {
    console.error('Error getting personal information:', error);
  }
};

export default updatePersonalProfile;

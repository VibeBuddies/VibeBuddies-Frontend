// updateProfileImage.ts
import axios from 'axios';
import { API_URL } from '../utils/APIURL';

const updateProfileImage = async (profileImageFile: File) => {
  /**
   * api function call to update profile image
   */

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found, please log in.');
    }

    // using FormData so multer can handle the image
    const formData = new FormData();
    formData.append('profileImage', profileImageFile);

    // sending the form to the backend server
    const response = await axios.patch(
      `${API_URL}/users/uploadImage`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error('Error uploading new profile image:', error);
  }
};

export default updateProfileImage;

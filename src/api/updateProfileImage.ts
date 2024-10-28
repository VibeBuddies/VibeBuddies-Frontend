// updateProfileImage.ts
import axios from 'axios';
import { API_URL } from '../utils/APIURL';

const updateProfileImage = async (profileImageFile: File) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found, please log in.');
    }

    const formData = new FormData();
    formData.append('profileImage', profileImageFile);

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

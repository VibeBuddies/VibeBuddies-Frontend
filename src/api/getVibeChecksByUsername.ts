import axios from 'axios';
import { API_URL } from '../utils/APIURL';

const getVibeChecksByUsername = async (username: string) => {
  /**
   * api function call to get all the vibeChecks for a given username
   */

  try {
    // getting token
    const token = localStorage.getItem('token');
    // making call to backend api route
    const response = await axios.get(
      `${API_URL}/vibe-checks/username/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error('failed to retrieve vibeChecks by username');
  }
};

export default getVibeChecksByUsername;

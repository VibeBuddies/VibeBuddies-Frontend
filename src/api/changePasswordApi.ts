import axios from "axios";
import { API_URL } from "../utils/APIURL"

const sendChangePassword = async (token: string | null, currentPassword: string, newPassword: string) => {

    const data = {currentPassword, newPassword}; //patch needs a data in the body regardless of if the service method actually needs it
    try {
        // Send POST request
        const response = await axios.patch(`${API_URL}/users/password`, data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,  // Adding the token to the headers
                    'Content-Type': 'application/json',  // Ensure the correct Content-Type
                }
            });

        // console.log("Response:", response.data); // Log the response for debugging
        return response.data;
    } catch (error) {
        console.error("Error submitting the form:", error); // Log any error that occurs
    }
}


export default sendChangePassword;

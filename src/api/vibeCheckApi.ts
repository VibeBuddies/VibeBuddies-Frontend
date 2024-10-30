import axios from "axios";
import { SelectedAlbum } from "../types";
import { API_URL } from "../utils/APIURL";

const sendCreateVibeCheck = async (token:string|null, isFormValid:boolean, selectedAlbum: SelectedAlbum | null, review: string, rating: number | null) => {

    if (isFormValid) {
      // Prepare the data to send
      const data = {
        album_id: selectedAlbum, 
        review: review,
        rating: rating,
      };
      
      try {
        // Send POST request
        const response = await axios.post(`${API_URL}/vibe-checks`, data,
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
  };

export default sendCreateVibeCheck;
  
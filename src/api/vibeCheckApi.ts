import axios from "axios";
import { SelectedAlbum } from "../types";

const sendCreateVibeCheck = async (isFormValid:boolean, selectedAlbum: SelectedAlbum | null, review: string, rating: number | null) => {

    if (isFormValid) {
      // Prepare the data to send
      const data = {
        album_id: selectedAlbum, // Assuming selectedAlbum has an 'id' property
        review: review,
        rating: rating,
      };
      
      const token = localStorage.getItem("token");
      try {
        // Send POST request
        const response = await axios.post("http://35.172.116.68:3000/vibe-checks", data,
           {  
            headers: {
            Authorization: `Bearer ${token}`,  // Adding the token to the headers
            'Content-Type': 'application/json',  // Ensure the correct Content-Type
          }
      });
        console.log("Response:", response.data); // Log the response for debugging
      } catch (error) {
        console.error("Error submitting the form:", error); // Log any error that occurs
      }
    }
  };

export default sendCreateVibeCheck;
  
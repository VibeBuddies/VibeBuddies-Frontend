import axios from "axios";

const sendLike = async (vibe_check_id: string) => {

    if (vibe_check_id) {
      const data = {}; //patch needs a data in the body regardless of if the service method actually needs it
      const token = localStorage.getItem("token");
      try {
        // Send POST request
        const response = await axios.patch(`http://35.172.116.68:3000/vibe-checks/${vibe_check_id}/like`, data,
           {  
            headers: {
            Authorization: `Bearer ${token}`,  // Adding the token to the headers
            'Content-Type': 'application/json',  // Ensure the correct Content-Type
          }
      });
        //console.log(token)
        console.log("Response:", response.data); // Log the response for debugging
        
        return response.data;
      } catch (error) {
        console.error("Error submitting the form:", error); // Log any error that occurs
      }
    }
  };

export default sendLike;
  
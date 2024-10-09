import React from "react";
import { FormControl, Box, Rating } from "@mui/material";
import { FormLabel } from "@mui/joy";


interface RatingInputProps {
  ratingValue: number | null;
  setRatingValue: (value: number | null) => void;
}

const RatingInput: React.FC<RatingInputProps> = ({
  ratingValue,
  setRatingValue,
}) => {
  return (
    <FormControl>
      <FormLabel>Rating</FormLabel>
      <Box sx={{ "& > legend": { mt: 2 } }}>
        <Rating
          name="simple-controlled"
          value={ratingValue}
          onChange={(event, newRatingValue) => setRatingValue(newRatingValue)}
          sx={{ fontSize: "24px" }}
          precision={0.5}
        />
      </Box>
    </FormControl>
  );
};

export default RatingInput;

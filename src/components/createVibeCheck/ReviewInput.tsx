import React from "react";
import { FormControl, FormLabel, Textarea, Box } from "@mui/joy";

interface ReviewInputProps {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

//Component with text box for review that increases size vertically when text overflows
const ReviewInput: React.FC<ReviewInputProps> = ({ value, handleChange }) => {
  return (
    <FormControl>
      <FormLabel>Review</FormLabel>
      <Box
        sx={{
          display: "inline-block",
          resize: "vertical",
          minHeight: "40px",
        }}
      >
        <Textarea
          value={value}
          onChange={handleChange}
          placeholder="Type your review here"
          minRows={3}
          sx={{
            width: "100%",
            resize: "vertical",
            borderRadius: "4px",
          }}
        />
      </Box>
    </FormControl>
  );
};

export default ReviewInput;

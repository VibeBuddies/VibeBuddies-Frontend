import React from "react"
import { Box, Typography, Rating } from "@mui/material"

interface VibeCheckItemProps {
  id: number
  album: string
  review: string
  stars: number
  image: string
}

const VibeCheckItem: React.FC<VibeCheckItemProps> = ({
  album,
  review,
  stars,
  image,
}) => {
  return (
    <Box
      p={2}
      mb={2}
      border={1}
      borderRadius={5}
      borderColor="grey.300"
      display="flex"
      alignItems="center"
    >
      {/* Album Cover Image */}
      <Box mr={2}>
        <img
          src={image}
          alt={album}
          style={{ width: "300px", height: "300px", borderRadius: "5px" }}
        />
      </Box>

      {/* Album Information */}
      <Box>
        <Typography variant="h6">{album}</Typography>
        <Typography>{review}</Typography>
        {/* 5-Star Rating */}
        <Rating
          name={`rating-${album}`}
          value={stars}
          precision={0.5}
          readOnly
        />
      </Box>
    </Box>
  )
}

export default VibeCheckItem

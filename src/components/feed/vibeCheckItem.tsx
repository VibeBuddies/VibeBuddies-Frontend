import React, { useState } from "react"
import { Box, Typography, Rating, IconButton, Tooltip } from "@mui/material"
import CommentIcon from "@mui/icons-material/Comment"
import CommentModal from "./commentModal" // Import the CommentModal component

/* this creates a vibeCheck item in the vibeCheckList 
which sits on the feed a vibeCheck item will have an: 
id, 
an album name, 
a review, 
a star rating, 
and an image which is the album art. (for now this is a string to a text link url subject to change)

comment:
each vibeCheck also has a comment button which opens
a modal that dispalys a comment chain and will prompt the 
user to add their own comment 

like/dislike: TODO
*/

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
  const [open, setOpen] = useState<boolean>(false) // State to control modal open/close

  // Handle opening the modal
  const handleOpen = () => {
    setOpen(true)
  }

  // Handle closing the modal
  const handleClose = () => {
    setOpen(false)
  }

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
      <Box flex={1}>
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

      {/* comment Icon Button */}
      <Tooltip title="Comments" arrow placement="top">
        <IconButton
          onClick={handleOpen}
          sx={{
            color: "grey", // Set the color of the icon to grey
          }}
        >
          <CommentIcon />
        </IconButton>
      </Tooltip>
      {/* Render the modal component */}
      <CommentModal open={open} handleClose={handleClose} album={album} />
    </Box>
  )
}

export default VibeCheckItem

import React from "react"
import { Box, Typography, Rating, Modal } from "@mui/material"
import defaultAvi from "./default-avi.jpg"

interface VibeCheckModalProps {
  open: boolean
  handleClose: () => void
  album_id: {
    artist: string
    cover_url: string
    name: string
  }
  review: string
  rating: number
  likes: number
  dislikes: number
  timestamp: number
  username: string
}

const VibeCheckModal: React.FC<VibeCheckModalProps> = ({
  open,
  handleClose,
  album_id,
  review,
  rating,
  likes,
  dislikes,
  timestamp,
  username,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      BackdropProps={{
        sx: {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Box
        p={4}
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          maxWidth: "80%",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          padding: "2rem",

          // Centers the content
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box display="flex" alignItems="flex-start" mr={2}>
          <Box mr={1}>
            <img
              src={defaultAvi}
              alt={"err"}
              style={{ width: "45px", height: "45px", borderRadius: "25px" }}
            />
          </Box>
          <Typography variant="h5" marginTop={0.5}>
            {username}
          </Typography>
        </Box>
        <Typography variant="h4" mb={2}>
          {album_id.name}
        </Typography>
        <Box display="flex" alignItems="center">
          <Box mr={2}>
            <img
              src={album_id.cover_url}
              alt={album_id.name}
              style={{ width: "400px", height: "400px", borderRadius: "5px" }}
            />
          </Box>
          <Box>
            <Typography variant="h6">{album_id.artist}</Typography>

            {/* Scrollable review box with scrollbar always visible */}
            <Box
              sx={{
                maxHeight: "200px",
                overflowY: "scroll",
                mt: 2,
                pr: 2,
              }}
            >
              <Typography>{review}</Typography>
            </Box>

            <Rating
              name={`modal-rating-${album_id.name}`}
              value={rating}
              precision={0.5}
              readOnly
              sx={{ mt: 2 }}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default VibeCheckModal

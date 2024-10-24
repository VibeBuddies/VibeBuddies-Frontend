import React, { useState } from "react"
import {
  Box,
  Typography,
  Rating,
  Modal,
  TextField,
  Button,
} from "@mui/material"
import CommentList from "./comments/commentList"

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
  comments: any[]
  likes: number
  dislikes: number
  timestamp: number
  username: string
  likeOrDislikeButtonsElement: JSX.Element
  onSubmitComment: (comment: string) => void // Add this prop
}

const VibeCheckModal: React.FC<VibeCheckModalProps> = ({
  open,
  handleClose,
  album_id,
  review,
  rating,
  comments,
  likes,
  dislikes,
  timestamp,
  username,
  likeOrDislikeButtonsElement,
  onSubmitComment, // Destructure this
}) => {
  const [newComment, setNewComment] = useState("")

  // Function to handle adding a new comment
  const handleAddComment = () => {
    if (newComment.trim()) {
      onSubmitComment(newComment) // Call the passed in function to handle comment submission
      setNewComment("") // Clear the input after submission
    }
  }

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
          maxHeight: "90vh",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          padding: "2rem",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          overflowY: "auto", // Make modal scrollable
        }}
      >
        <Box display="flex" alignItems="flex-start" mr={2}>
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
            <Box>{likeOrDislikeButtonsElement}</Box>
          </Box>
        </Box>

        <Box mt={4}>
          {/* Input field to add a new comment */}
          <Box mt={2} display="flex" alignItems="center">
            <TextField
              fullWidth
              label="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              onClick={handleAddComment}
              sx={{ ml: 2 }}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Box>
          <Box
            sx={
              {
                // maxHeight: "50vh",
              }
            }
          >
            <CommentList comments={comments} />
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default VibeCheckModal

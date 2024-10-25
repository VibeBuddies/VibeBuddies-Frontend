import React, { useState, useContext } from "react"
import {
  Box,
  Typography,
  Rating,
  Modal,
  TextField,
  Button,
  Snackbar,
  Alert,
  Avatar,
} from "@mui/material"
import CommentList from "./comments/commentList"
import createComment from "../../api/createComment"
import { UserContext } from "../../components/Context/UserContext"
import { Link } from "react-router-dom"

interface VibeCheckModalProps {
  open: boolean
  handleClose: () => void
  vibe_check_id: string
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
}

const VibeCheckModal: React.FC<VibeCheckModalProps> = ({
  open,
  handleClose,
  vibe_check_id,
  album_id,
  review,
  rating,
  comments,
  likes,
  dislikes,
  timestamp,
  username,
  likeOrDislikeButtonsElement,
}) => {
  const [newComment, setNewComment] = useState("")
  const [localComments, setLocalComments] = useState<any[]>(comments)

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  // handle adding a new comment
  const handleAddComment = () => {
    if (newComment.trim()) {
      createComment(vibe_check_id, newComment)
      handleTempComment(newComment)
      setNewComment("")
      setSnackbarMessage("Comment added successfully!")
      setSnackbarOpen(true)
    }
  }

  const { username: loggedInUser } = useContext(UserContext)!

  //creates a temporary comment so the user
  //can see their comment get added in real time
  const handleTempComment = (comment: string) => {
    const newComment = {
      username: loggedInUser,
      user_id: "",
      comment_id: "",
      comment_body: comment,
      timestamp: Date.now(),
    }
    setLocalComments((prevComments) => [...prevComments, newComment])
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
          overflowY: "auto",
        }}
      >
        <Box display="flex" alignItems="flex-start">
          <Box mr={1}>
            <Avatar alt={loggedInUser} sx={{ width: 40, height: 40 }}>
              {loggedInUser.charAt(0).toUpperCase()}
            </Avatar>
          </Box>
          <Typography variant="h5" marginTop={0.5}>
            <Link
              to={`/profile/${username}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.textDecoration = "underline")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.textDecoration = "none")
              }
            >
              {username}
            </Link>
          </Typography>
        </Box>
        <Box>
          <Typography variant="h4" mb={1} mt={1}>
            {album_id.name}
          </Typography>
        </Box>
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
          <Box>
            <CommentList comments={localComments} />
          </Box>
        </Box>

        {/* Snackbar for comment submission */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
      </Box>
    </Modal>
  )
}

export default VibeCheckModal

import React, { useContext, useState } from "react"
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Rating,
  Badge,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ThumbDownIcon from "@mui/icons-material/ThumbDown"
import { UserContext } from "../Context/UserContext"
import VibeCheckModal from "../feed/vibeCheckModal"
import { formatTimeDifference } from "../../utils/formatTimeDifference"

interface VibeCheckProps {
  handleDelete(vibe_check_id: string): void
  vibeCheckInfo: {
    album_id: {
      artist: string
      cover_url: string
      name: string
    }
    dislikes: number
    likes: number
    rating: number
    review: string
    timestamp: number
    username: string
    vibe_check_id: string
    comments: any[]
  }
}

const VibeCheckCard: React.FC<VibeCheckProps> = ({
  vibeCheckInfo,
  handleDelete,
}) => {
  const { username: loggedInUser } = useContext(UserContext)!
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  // truncates review
  const truncateReview = (text: string, limit: number) => {
    return text.length > limit ? `${text.slice(0, limit)}[...]` : text
  }

  return (
    <>
      <Box
        p={2}
        mb={2}
        border={1}
        borderRadius={5}
        borderColor="grey.300"
        display="flex"
        alignItems="center"
        position="relative"
        onClick={handleOpenModal}
        sx={{
          cursor: "pointer",
          backgroundColor: "white",
          transition: "background-color 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
          minWidth: "100%",
        }}
      >
        {/* Left side with avatar and album cover */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          mr={2}
        >
          <Box display="flex" alignItems="flex-start" mb={1}>
            <Avatar
              alt={vibeCheckInfo.username}
              sx={{ width: 30, height: 30, mr: 1 }}
            >
              {vibeCheckInfo.username.charAt(0).toUpperCase()}
            </Avatar>
            <Box display="flex" alignItems="center">
              <Typography variant="subtitle1">
                {vibeCheckInfo.username}
              </Typography>
              <Typography variant="body2" color="textSecondary" ml={1}>
                {formatTimeDifference(vibeCheckInfo.timestamp)}
              </Typography>
            </Box>
          </Box>
          <img
            src={vibeCheckInfo.album_id.cover_url}
            alt={vibeCheckInfo.album_id.name}
            style={{ width: "300px", height: "300px", borderRadius: "5px" }}
          />
        </Box>

        {/* Right side with album details and review */}
        <Box display="flex" flexDirection="column" flex={1}>
          <Typography variant="h6">{vibeCheckInfo.album_id.name}</Typography>
          <Typography>{`Artist: ${vibeCheckInfo.album_id.artist}`}</Typography>
          <Typography>{truncateReview(vibeCheckInfo.review, 100)}</Typography>
          <Box mt={1}>
            <Rating
              name={`rating-${vibeCheckInfo.vibe_check_id}`}
              value={vibeCheckInfo.rating}
              precision={0.5}
              readOnly
            />
          </Box>
        </Box>

        {/* Display only static like and dislike counts */}
        <Box
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography>{vibeCheckInfo.likes}</Typography>
          <IconButton aria-label="like" color="default" disabled>
            <ThumbUpIcon />
          </IconButton>
          <Typography>{vibeCheckInfo.dislikes}</Typography>
          <IconButton aria-label="dislike" color="default" disabled>
            <ThumbDownIcon />
          </IconButton>
          {loggedInUser === vibeCheckInfo.username && (
            <IconButton
              aria-label="delete"
              onClick={(e) => {
                e.stopPropagation()
                handleDelete(vibeCheckInfo.vibe_check_id)
              }}
              sx={{ marginRight: 1 }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* VibeCheckModal component */}
      <VibeCheckModal
        open={openModal}
        handleClose={handleCloseModal}
        vibe_check_id={vibeCheckInfo.vibe_check_id}
        album_id={vibeCheckInfo.album_id}
        review={vibeCheckInfo.review}
        rating={vibeCheckInfo.rating}
        comments={vibeCheckInfo.comments}
        likes={vibeCheckInfo.likes}
        dislikes={vibeCheckInfo.dislikes}
        timestamp={vibeCheckInfo.timestamp}
        username={vibeCheckInfo.username}
        likeOrDislikeButtonsElement={<></>}
      />
    </>
  )
}

export default VibeCheckCard

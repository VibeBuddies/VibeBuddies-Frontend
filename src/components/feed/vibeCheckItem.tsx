import React, { useContext, useEffect, useState } from "react"
import { Box, Typography, Rating, Avatar } from "@mui/material"
import VibeCheckModal from "./vibeCheckModal"
import defaultAvi from "./default-avi.jpg"
import { relative } from "path"
import LikeOrDislikeButtons from "./LikeOrDislikeButtons/LikeOrDislikeButtons"
import sendLike from "../../api/sendLikeApi"
import sendDislike from "../../api/sendDislikeApi"
import { AuthContext } from "../Context/AuthContext"
import { UserContext } from "../Context/UserContext"
import { Link } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import { formatTimeDifference } from "../../utils/formatTimeDifference"

interface VibeCheckItemProps {
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
  liked_by: string[]
  disliked_by: string[]
}

const VibeCheckItem: React.FC<VibeCheckItemProps> = ({
  vibe_check_id,
  album_id,
  review,
  rating,
  comments,
  likes,
  dislikes,
  timestamp,
  username,
  liked_by,
  disliked_by,
}) => {
  //modal props
  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  // splices the review to a specific character limit and adds [...] to end
  const truncateReview = (text: string, limit: number) => {
    if (text.length > limit) {
      return text.slice(0, limit) + "[...]"
    }
    return text
  }

  //likesordislikes button props
  const { token } = useContext(AuthContext)!
  //add username from user context
  const { username: contextUsername } = useContext(UserContext)!
  const [likePressed, setLikePressed] = useState<boolean>(false)
  const [dislikePressed, setDislikePressed] = useState<boolean>(false)
  const [localLikes, setLocalLikes] = useState<number>(likes)
  const [localDislikes, setLocalDislikes] = useState<number>(dislikes)

  //checks if current auth user is in the string arrays liked_by and disliked_by
  useEffect(() => {
    if (liked_by.includes(contextUsername)) {
      setLikePressed(true)
      setDislikePressed(false)
    } else if (disliked_by.includes(contextUsername)) {
      setDislikePressed(true)
      setLikePressed(false)
    } else {
      setLikePressed(false)
      setDislikePressed(false)
    }
  }, [liked_by, disliked_by, contextUsername])

  const handleLikePress = async () => {
    try {
      const updatedLikes: any = await sendLike(token, vibe_check_id)
      // console.log(`these are updatedLike: ${updatedLikes.data.updatedVibeCheck.likes}`)
      setLocalLikes(updatedLikes.data.updatedVibeCheck.likes) // Update local likes
      setLikePressed((prevState) => !prevState) // Mark like as pressed
      setDislikePressed(false) // Reset dislike
    } catch (error) {
      console.error("Error liking the item:", error)
    }
  }

  const handleDislikePress = async () => {
    try {
      const updatedDislikes: any = await sendDislike(token, vibe_check_id)
      // console.log(`these are updatedLike: ${updatedLikes.data.updatedVibeCheck.likes}`)
      setLocalDislikes(updatedDislikes.data.updatedVibeCheck.dislikes) // Update local likes
      setDislikePressed((prevState) => !prevState) // Mark like as pressed
      setLikePressed(false) // Reset dislike
    } catch (error) {
      console.error("Error disliking the item:", error)
    }
  }

  //rendered beforehand as to easily pass down JSX.Element to modal as prop
  const renderedLikeOrDislikeButtonsElement = (
    <LikeOrDislikeButtons
      vibe_check_id={vibe_check_id}
      likePressed={likePressed}
      dislikePressed={dislikePressed}
      onLikePress={handleLikePress}
      onDislikePress={handleDislikePress}
      likes={localLikes}
      dislikes={localDislikes}
    />
  )

  return (
    <>
      {/* Clickable VibeCheck that opens modal */}
      <Box
        p={2}
        mb={2}
        border={1}
        borderRadius={5}
        borderColor="grey.300"
        display="flex"
        alignItems="center"
        onClick={handleOpenModal}
        sx={{
          cursor: "pointer",
          backgroundColor: "white",
          transition: "background-color 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        {/* Album Cover and Username stacked */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          mr={2}
        >
          {/* profile pic and username side by side */}
          <Box display="flex" alignItems="flex-start" mr={2} mb={1}>
            <Box mr={1}>
              <Avatar alt={contextUsername} sx={{ width: 30, height: 30 }}>
                {contextUsername.charAt(0).toUpperCase()}
              </Avatar>
            </Box>
            <Box>
              <Typography variant="subtitle1">{username}</Typography>
            </Box>
            <Box>
              <Typography
                variant="body2"
                color="textSecondary"
                gutterBottom
                mt={0.6}
                ml={0.5}
              >
                {formatTimeDifference(timestamp)}
              </Typography>
            </Box>
          </Box>
          <img
            src={album_id.cover_url}
            alt={album_id.name}
            style={{ width: "300px", height: "300px", borderRadius: "5px" }}
          />
        </Box>

        {/* Album Information */}
        <Box display={"flex"} flexDirection={"column"} flex={1}>
          <Box flex={1}>
            <Typography variant="h6">{album_id.name}</Typography>
            <Typography>{`Artist: ${album_id.artist}`}</Typography>
            {/* Display truncated review */}
            <Typography>
              {truncateReview(review, 100)} {/* Truncate to 100 characters */}
            </Typography>
            <Rating
              name={`rating-${vibe_check_id}`}
              value={rating}
              precision={0.5}
              readOnly
            />
          </Box>
          <Box
            sx={{
              alignSelf: "right",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* <LikeOrDislikeButtons 
              vibe_check_id={vibe_check_id}
              likePressed={likePressed}
              dislikePressed={dislikePressed}
              onLikePress={handleLikePress}
              onDislikePress={handleDislikePress}
              likes={localLikes}
              dislikes={localDislikes}
              /> */}
            {renderedLikeOrDislikeButtonsElement}
          </Box>
        </Box>
      </Box>

      {/* Use the modal component */}
      <VibeCheckModal
        open={openModal}
        handleClose={handleCloseModal}
        vibe_check_id={vibe_check_id}
        album_id={album_id}
        review={review}
        rating={rating}
        comments={comments}
        likes={likes}
        dislikes={dislikes}
        timestamp={timestamp}
        username={username}
        likeOrDislikeButtonsElement={renderedLikeOrDislikeButtonsElement}
      />
    </>
  )
}

export default VibeCheckItem

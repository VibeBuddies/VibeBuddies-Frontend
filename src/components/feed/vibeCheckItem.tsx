import React, { useState } from "react"
import { Box, Typography, Rating } from "@mui/material"
import VibeCheckModal from "./vibeCheckModal"
import defaultAvi from "./default-avi.jpg"
import { relative } from "path"
import LikeOrDislikeButtons from "./LikeOrDislikeButtons/LikeOrDislikeButtons"
import sendLike from "../../api/sendLikeApi"
import sendDislike from "../../api/sendDislikeApi"

interface VibeCheckItemProps {
  vibe_check_id: string
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

const VibeCheckItem: React.FC<VibeCheckItemProps> = ({
  vibe_check_id,
  album_id,
  review,
  rating,
  likes,
  dislikes,
  timestamp,
  username,
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
  const [likePressed, setLikePressed] = useState<boolean>(false);
  const [dislikePressed, setDislikePressed] = useState<boolean>(false);
  const [localLikes, setLocalLikes] = useState<number>(likes);
  const [localDislikes, setLocalDislikes] = useState<number>(dislikes);

  // const handleLikePress = async () => {
  //   setLikePressed(prevState => !prevState);
  //   setDislikePressed(false); // Reset dislike
  //   // Call API or handle logic for liking
  //   const updatedLikes = await sendLike(vibe_check_id)
  //   setLocaLikes(updatedLikes);
  // };

  const handleLikePress = async () => {
    try {
      const updatedLikes: any = await sendLike(vibe_check_id);
      // console.log(`these are updatedLike: ${updatedLikes.data.updatedVibeCheck.likes}`)
      setLocalLikes(updatedLikes.data.updatedVibeCheck.likes); // Update local likes
      setLikePressed(prevState => !prevState);        // Mark like as pressed
      setDislikePressed(false);    // Reset dislike
    } catch (error) {
      console.error("Error liking the item:", error);
    }
  };

  const handleDislikePress = async () => {
    try {
      const updatedDislikes: any = await sendDislike(vibe_check_id);
      // console.log(`these are updatedLike: ${updatedLikes.data.updatedVibeCheck.likes}`)
      setLocalDislikes(updatedDislikes.data.updatedVibeCheck.dislikes); // Update local likes
      setDislikePressed(prevState => !prevState);        // Mark like as pressed
      setLikePressed(false);    // Reset dislike
    } catch (error) {
      console.error("Error liking the item:", error);
    }
  };

  // const handleDislikePress = () => {
  //   setDislikePressed(prevState => !prevState);
  //   setLikePressed(false); // Reset like
  //   // Call API or handle logic for disliking
  //   sendDislike(vibe_check_id);
  // };

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
          <Box display="flex" alignItems="flex-start" mr={2}>
            <Box mr={1}>
              <img
                src={defaultAvi}
                alt={"err"}
                style={{ width: "30px", height: "30px", borderRadius: "25px" }}
              />
            </Box>
            <Typography variant="subtitle1">{username}</Typography>
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
              <LikeOrDislikeButtons 
              vibe_check_id={vibe_check_id}
              likePressed={likePressed}
              dislikePressed={dislikePressed}
              onLikePress={handleLikePress}
              onDislikePress={handleDislikePress}
              likes={localLikes}
              dislikes={localDislikes}
              />
            </Box>
        </Box>
      </Box>

      {/* Use the modal component */}
      <VibeCheckModal
        open={openModal}
        handleClose={handleCloseModal}
        album_id={album_id}
        review={review}
        rating={rating}
        likes={likes}
        dislikes={dislikes}
        timestamp={timestamp}
        username={username}
      />
    </>
  )
}

export default VibeCheckItem

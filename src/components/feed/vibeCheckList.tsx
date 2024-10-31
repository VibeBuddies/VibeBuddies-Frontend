import React from "react"
import { Box, Typography } from "@mui/material"
import VibeCheckItem from "./vibeCheckItem"
import LoadingAnimation from "../animations/LoadingAnimation"

/* arranges the vibeChecks into a scrollable list on the feed*/

interface VibeCheck {
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

interface VibeCheckListProps {
  vibeChecks: VibeCheck[]
}

const VibeCheckList: React.FC<VibeCheckListProps> = ({ vibeChecks }) => {
  return (
    <>
      {vibeChecks.length > 0 ? (
        vibeChecks.map((vibeCheck) => (
          <VibeCheckItem
            key={vibeCheck.vibe_check_id}
            vibe_check_id={vibeCheck.vibe_check_id}
            album_id={vibeCheck.album_id}
            review={vibeCheck.review}
            rating={vibeCheck.rating}
            comments={vibeCheck.comments}
            likes={vibeCheck.likes}
            dislikes={vibeCheck.dislikes}
            timestamp={vibeCheck.timestamp}
            username={vibeCheck.username}
            liked_by={vibeCheck.liked_by}
            disliked_by={vibeCheck.disliked_by}
          />
        ))
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Typography variant="h6" align="center">
            No VibeChecks
          </Typography>
        </Box>
      )}
    </>
  )
}

export default VibeCheckList

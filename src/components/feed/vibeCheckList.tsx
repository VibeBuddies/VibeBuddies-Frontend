import React from "react"
import { Box, Typography } from "@mui/material"
import VibeCheckItem from "./vibeCheckItem"

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
  likes: number
  dislikes: number
  timestamp: number
  username: string
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
            likes={vibeCheck.likes}
            dislikes={vibeCheck.dislikes}
            timestamp={vibeCheck.timestamp}
            username={vibeCheck.username}
          />
        ))
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh" // Full viewport height to vertically center
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

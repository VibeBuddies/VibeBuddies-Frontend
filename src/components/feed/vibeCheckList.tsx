import React from "react"
import { Box, Typography } from "@mui/material"
import VibeCheckItem from "./vibeCheckItem"

interface VibeCheck {
  id: number
  album: string
  review: string
  stars: number
  image: string
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
            key={vibeCheck.id}
            id={vibeCheck.id}
            album={vibeCheck.album}
            review={vibeCheck.review}
            stars={vibeCheck.stars}
            image={vibeCheck.image}
          />
        ))
      ) : (
        <Typography variant="h6" align="center">
          No vibeChecks found.
        </Typography>
      )}
    </>
  )
}

export default VibeCheckList

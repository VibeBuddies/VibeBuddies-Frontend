import React, { useState, useEffect } from "react"
import { Container, Box } from "@mui/material"
import VibeCheckList from "../components/feed/vibeCheckList"
import organizeData from "../components/feed/feedDataOrganizer"

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
}

const Feed: React.FC = () => {
  const [vibeChecks, setVibeChecks] = useState<VibeCheck[]>([])

  // fetch organized vibechecks
  useEffect(() => {
    const fetchData = async () => {
      const data = await organizeData()
      setVibeChecks(data)
    }

    fetchData()
  }, [])

  return (
    <Container maxWidth="sm" sx={{ display: "flex", position: "relative" }}>
      <Box sx={{ flexGrow: 1 }}>
        {/* Scrollable VibeCheckList */}
        <Box
          sx={{
            maxHeight: "80vh",
            overflowY: "auto",
            pt: 8,
          }}
        >
          <VibeCheckList vibeChecks={vibeChecks} />
        </Box>
      </Box>
    </Container>
  )
}

export default Feed

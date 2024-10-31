import React, { useState, useEffect, useContext } from "react"
import { Container, Box } from "@mui/material"
import VibeCheckList from "../components/feed/vibeCheckList"
import organizeData from "../components/navbar/navbarComponents/globalFeedDataOrganizer"
import { UserContext } from "../components/Context/UserContext"

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

const GlobalFeed: React.FC = () => {
  const [vibeChecks, setVibeChecks] = useState<VibeCheck[]>([])

  //get the current user from the context
  const userContext = useContext(UserContext)

  //fetch organized vibechecks
  const fetchVibeChecks = async () => {
    const fetchedData = await organizeData()

    //compare the new data with the current data state
    const isDataDifferent =
      JSON.stringify(fetchedData) !== JSON.stringify(vibeChecks)

    //update the state only if the data has discrepencies
    if (isDataDifferent) {
      setVibeChecks(fetchedData)
    }
  }

  // periodically fetch the data
  useEffect(() => {
    fetchVibeChecks()

    const intervalId = setInterval(() => {
      fetchVibeChecks()
    }, 3600000)

    return () => clearInterval(intervalId)
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

export default GlobalFeed

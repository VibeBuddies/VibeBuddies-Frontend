import React, { useState, useEffect, useContext } from "react"
import { Container, Box, Typography } from "@mui/material"
import VibeCheckList from "../components/feed/vibeCheckList"
import organizeData from "../components/feed/feedDataOrganizer"
import { UserContext } from "../components/Context/UserContext"
import LoadingAnimation from "../components/animations/LoadingAnimation"

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

const Feed: React.FC = () => {
  const [vibeChecks, setVibeChecks] = useState<VibeCheck[]>([])
  const [loading, setLoading] = useState(true)

  //get the current user from the context
  const userContext = useContext(UserContext)

  //fetch organized vibechecks
  const fetchVibeChecks = async () => {
    if (userContext && userContext.username) {
      const fetchedData = await organizeData(userContext.username)

      // compare the new data with the current data state
      const isDataDifferent =
        JSON.stringify(fetchedData) !== JSON.stringify(vibeChecks)

      // update the state only if the data has discrepancies
      if (isDataDifferent) {
        setVibeChecks(fetchedData)
      }
      setLoading(false)
    }
  }

  //periodically fetch the data
  useEffect(() => {
    fetchVibeChecks()

    //interval to fetch data periodically
    const intervalId = setInterval(() => {
      fetchVibeChecks()
    }, 3600000)

    return () => clearInterval(intervalId)
  }, [vibeChecks])

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

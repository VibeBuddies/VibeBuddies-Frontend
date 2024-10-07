import React from "react"
import { Container, Box, Typography } from "@mui/material"

const vibeChecks = [
  {
    id: 1,
    album: "Album One",
    review: "Amazing sound, great beats!",
    rating: 9,
  },
  {
    id: 2,
    album: "Album Two",
    review: "Mediocre at best, but decent vibes.",
    rating: 6,
  },
  {
    id: 3,
    album: "Album Three",
    review: "Loved it from start to finish!",
    rating: 10,
  },
]

const Feed = () => {
  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Your VibeChecks
        </Typography>
        {vibeChecks.map((vibeCheck) => (
          <Box
            key={vibeCheck.id}
            p={2}
            mb={2}
            border={1}
            borderRadius={5}
            borderColor="grey.300"
          >
            <Typography variant="h6">{vibeCheck.album}</Typography>
            <Typography>{vibeCheck.review}</Typography>
            <Typography variant="body2">
              Rating: {vibeCheck.rating}/10
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  )
}

export default Feed

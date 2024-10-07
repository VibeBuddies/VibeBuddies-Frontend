import React, { useState, ChangeEvent } from "react"
import { Container, Box, Typography, TextField, Rating } from "@mui/material"

// Define the shape of the vibeChecks array
interface VibeCheck {
  id: number
  album: string
  review: string
  stars: number
  image: string
}

// Initial vibeChecks data
const initialVibeChecks: VibeCheck[] = [
  {
    id: 1,
    album: "Igor",
    review:
      "Amazing sound, great beats! This is my album of the year Tyler is the GOAT!!! 🐐",
    stars: 4,
    image:
      "https://www.billboard.com/wp-content/uploads/media/tyler-the-creator-igor-album-art-2019-billboard-embed.jpg?w=600", // Placeholder image
  },
  {
    id: 2,
    album: "Currents",
    review: "Sick vibes and amazing vocals. 10 outta 10 would recommend!",
    stars: 5,
    image:
      "https://qodeinteractive.com/magazine/wp-content/uploads/2020/06/16-Tame-Impala.jpg", // Placeholder image
  },
  {
    id: 3,
    album: "Graduation",
    review: "A certified hip hop classic, Ye in peak form!",
    stars: 4.5,
    image:
      "https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg", // Placeholder image
  },
]

const Feed: React.FC = () => {
  const [vibeChecks, setVibeChecks] = useState<VibeCheck[]>(initialVibeChecks)
  const [searchTerm, setSearchTerm] = useState<string>("") // State for search input

  // Handle the star rating change
  const handleRatingChange = (newRating: number | null, id: number) => {
    const updatedVibeChecks = vibeChecks.map((vibeCheck) =>
      vibeCheck.id === id ? { ...vibeCheck, stars: newRating ?? 0 } : vibeCheck
    )
    setVibeChecks(updatedVibeChecks) // Update the state with new ratings
  }

  // Handle the search input change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase()) // Update search term in state
  }

  // Filter vibeChecks based on the search term
  const filteredVibeChecks = vibeChecks.filter((vibeCheck) =>
    vibeCheck.album.toLowerCase().includes(searchTerm)
  )

  return (
    <Container maxWidth="sm">
      <Box mt={5} mb={3}>
        {/* Search Bar */}
        <TextField
          fullWidth
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search"
        />
      </Box>

      {/* Display the filtered vibeChecks */}
      {filteredVibeChecks.length > 0 ? (
        filteredVibeChecks.map((vibeCheck) => (
          <Box
            key={vibeCheck.id}
            p={2}
            mb={2}
            border={1}
            borderRadius={5}
            borderColor="grey.300"
            display="flex"
            alignItems="center"
          >
            {/* Album Cover Image */}
            <Box mr={2}>
              <img
                src={vibeCheck.image}
                alt={vibeCheck.album}
                style={{ width: "300px", height: "300px", borderRadius: "5px" }}
              />
            </Box>

            {/* Album Information */}
            <Box>
              <Typography variant="h6">{vibeCheck.album}</Typography>
              <Typography>{vibeCheck.review}</Typography>
              {/* 5-Star Rating, now toggleable */}
              <Rating
                name={`rating-${vibeCheck.id}`}
                value={vibeCheck.stars}
                precision={0.5} // Allows half-stars
              />
            </Box>
          </Box>
        ))
      ) : (
        <Typography variant="h6" align="center">
          No albums found.
        </Typography>
      )}
    </Container>
  )
}

export default Feed

import React, { useState, ChangeEvent } from "react"
import { Container, Box } from "@mui/material"
import VibeCheckList from "../components/feed/vibeCheckList"
import SearchBar from "../components/feed/searchBar"
import CreateVibeCheckButton from "../components/feed/createVibeCheckButton"
import CreateVibeCheckModal from "../components/feed/createVibeCheckModal"

/* Arranges the feed components into a feed page 
which will be the central page the user arives to 
when they log in */

// Define the shape of the vibeChecks array
interface VibeCheck {
  id: number
  album: string
  review: string
  stars: number
  image: string
}

// mock data to populate the vibeCheckList until we can integrate api connectivity
const initialVibeChecks: VibeCheck[] = [
  {
    id: 1,
    album: "Igor",
    review:
      "Amazing sound, great beats! This is my album of the year Tyler is the GOAT!!! 🐐",
    stars: 4,
    image:
      "https://www.billboard.com/wp-content/uploads/media/tyler-the-creator-igor-album-art-2019-billboard-embed.jpg?w=600",
  },
  {
    id: 2,
    album: "Currents",
    review: "Sick vibes and amazing vocals. 10 outta 10 would recommend!",
    stars: 5,
    image:
      "https://qodeinteractive.com/magazine/wp-content/uploads/2020/06/16-Tame-Impala.jpg",
  },
  {
    id: 3,
    album: "Graduation",
    review: "A certified hip hop classic, Ye in peak form!",
    stars: 4.5,
    image:
      "https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg",
  },
]

const Feed: React.FC = () => {
  const [vibeChecks, setVibeChecks] = useState<VibeCheck[]>(initialVibeChecks)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false) // State for controlling the modal

  // Handle the search input change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase())
  }

  // Filter vibeChecks based on the search term
  const filteredVibeChecks = vibeChecks.filter((vibeCheck) =>
    vibeCheck.album.toLowerCase().includes(searchTerm)
  )

  // Handle opening and closing the modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Container maxWidth="sm" sx={{ display: "flex", position: "relative" }}>
      {/* Search Bar */}
      <Box sx={{ flexGrow: 1 }}>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />

        {/* Scrollable VibeCheckList */}
        <Box
          sx={{
            maxHeight: "80vh", // Adjust as needed
            overflowY: "auto",
            pr: 8, // Padding to avoid content overlapping the button
          }}
        >
          <VibeCheckList vibeChecks={filteredVibeChecks} />
        </Box>
      </Box>

      {/* Create VibeCheck Button, fixed to the right */}
      <CreateVibeCheckButton handleOpen={handleOpen} />

      {/* Create VibeCheck Modal */}
      <CreateVibeCheckModal open={open} handleClose={handleClose} />
    </Container>
  )
}

export default Feed

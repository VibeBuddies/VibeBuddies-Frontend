import React, { useState, ChangeEvent } from "react"
import { Container } from "@mui/material"
import VibeCheckList from "../components/feed/vibeCheckList"
import SearchBar from "../components/feed/searchBar"

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

  // Handle the search input change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase())
  }

  // Filter vibeChecks based on the search term
  const filteredVibeChecks = vibeChecks.filter((vibeCheck) =>
    vibeCheck.album.toLowerCase().includes(searchTerm)
  )

  return (
    <Container maxWidth="sm">
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <VibeCheckList vibeChecks={filteredVibeChecks} />
    </Container>
  )
}

export default Feed

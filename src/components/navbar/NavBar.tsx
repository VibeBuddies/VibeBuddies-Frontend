import React, { useState, ChangeEvent } from "react"
import { Box, TextField, Button } from "@mui/material"
import SearchBar from "./navbarComponents/searchBar"
import CreateVibeCheckButton from "./navbarComponents/createVibeCheckButton"
import CreateVibeCheckModal from "./navbarComponents/createVibeCheckModal"
import ProfileButton from "./navbarComponents/profileButton"
import SettingsButton from "./navbarComponents/settingsButton"
import FeedButton from "./navbarComponents/feedButton"

// Handle the search input change

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false) // State for controlling the modal

  // Handle the search input change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase())
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "",
      }}
    >
      <FeedButton />
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <CreateVibeCheckButton handleOpen={handleOpen} />
      <CreateVibeCheckModal open={open} handleClose={handleClose} />
      <SettingsButton />
      <ProfileButton />
    </Box>
  )
}

export default Navbar

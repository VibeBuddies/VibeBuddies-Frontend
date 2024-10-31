import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { TextField, Box, Snackbar, Alert } from "@mui/material"
import { useNavigate } from "react-router-dom"
import getUserByUsername from "../../../api/getUserbyUsernameApi"

/* Search bar component that sits above the vibeCheckList feed
 it will be used to search for other users. */

interface SearchBarProps {
  searchTerm: string
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  const navigate = useNavigate()

  //snack bar states
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")

  const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    // if "Enter" key is pressed navigate to the user's profile
    // if the user exists
    if (e.key === "Enter" && searchTerm.trim()) {
      try {
        const getUser = await getUserByUsername(searchTerm.trim())

        if (getUser != null) {
          navigate(`/profile/${searchTerm}`)
        }
      } catch (err) {
        console.log("profile does not exist", err)
        setSnackbarMessage("User does not exist")
        setSnackbarOpen(true)
      }
    }
  }

  //close snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  return (
    <Box mt={5} mb={3}>
      {/* searchbar */}
      <TextField
        fullWidth
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={onSearchChange}
        onKeyDown={handleKeyPress}
        placeholder="Search for users"
      />

      {/* Snackbar for invalid user */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="warning"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default SearchBar

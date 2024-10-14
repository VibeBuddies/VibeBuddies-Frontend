import React, { ChangeEvent } from "react"
import { TextField, Box } from "@mui/material"

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
  return (
    <Box mt={5} mb={3}>
      <TextField
        fullWidth
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={onSearchChange}
        placeholder="Search"
      />
    </Box>
  )
}

export default SearchBar

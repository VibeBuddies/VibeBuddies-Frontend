import React, { ChangeEvent } from "react"
import { TextField, Box } from "@mui/material"

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

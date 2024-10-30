import React from "react"
import { IconButton, Tooltip } from "@mui/material"
import LanguageIcon from "@mui/icons-material/Language"
import { useNavigate } from "react-router-dom"

/* global feed button on the navbar which will navigate 
the user to the global feed */

const GlobalFeedButton: React.FC = () => {
  const navigate = useNavigate()

  //navigate to the global feed page on button click
  const handleFeedClick = () => {
    navigate("/global-feed")
  }

  return (
    <Tooltip title="Go to Feed" arrow placement="bottom">
      <IconButton
        onClick={handleFeedClick}
        sx={{
          color: "grey",
          width: "100px",
          height: "100px",
        }}
      >
        <LanguageIcon sx={{ fontSize: 60 }} />
      </IconButton>
    </Tooltip>
  )
}

export default GlobalFeedButton

import React from "react"
import { IconButton, Tooltip } from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings"
import { useNavigate } from "react-router-dom"

/* settings button on the navbar which will navigate 
the user to their profile */

const SettingsButton: React.FC = () => {
  const navigate = useNavigate()

  // Navigate to the profile page on button click
  const handleSettingsClick = () => {
    navigate("/settings")
  }

  return (
    <Tooltip title="Go to Settings" arrow placement="bottom">
      <IconButton
        onClick={handleSettingsClick}
        sx={{
          color: "grey",
          width: "100px",
          height: "100px",
        }}
      >
        <SettingsIcon sx={{ fontSize: 60 }} />
      </IconButton>
    </Tooltip>
  )
}

export default SettingsButton

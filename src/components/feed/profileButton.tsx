import React from "react"
import { IconButton, Tooltip } from "@mui/material"
import PersonIcon from "@mui/icons-material/Person"
import { useNavigate } from "react-router-dom" // Import useNavigate

/* profile button on the feed page which will navigate 
the user to their profile */

const ProfileButton: React.FC = () => {
  const navigate = useNavigate()

  // Navigate to the profile page on button click
  const handleProfileClick = () => {
    navigate("/profile")
  }

  return (
    <Tooltip title="Go to Profile" arrow placement="top">
      <IconButton
        onClick={handleProfileClick}
        sx={{
          position: "fixed",
          right: 20,
          top: 20,
          color: "grey",
          width: "100px",
          height: "100px",
        }}
      >
        <PersonIcon sx={{ fontSize: 60 }} />
      </IconButton>
    </Tooltip>
  )
}

export default ProfileButton

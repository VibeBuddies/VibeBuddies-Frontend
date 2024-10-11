import React from "react"
import { IconButton, Tooltip } from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings"
import { useNavigate } from "react-router-dom"

/* settings button on the navbar which will
open up a settings modal */
interface SettingsButtonProps {
  handleOpenSettings: () => void
}

const SettingsButton: React.FC<SettingsButtonProps> = ({
  handleOpenSettings,
}) => {
  return (
    <Tooltip title="Go to Settings" arrow placement="bottom">
      <IconButton
        onClick={handleOpenSettings}
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

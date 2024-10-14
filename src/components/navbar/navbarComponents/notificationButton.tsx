import React from "react"
import { IconButton, Tooltip } from "@mui/material"
import NotificationsIcon from "@mui/icons-material/Notifications"

/*button on the feed page that will show the user their notifications*/

interface notificationsButtonProps {
  handleOpenNotifications: () => void
}

const NotificationsButton: React.FC<notificationsButtonProps> = ({
  handleOpenNotifications,
}) => {
  return (
    <Tooltip title="Notifications" arrow placement="top">
      <IconButton
        onClick={handleOpenNotifications}
        sx={{
          color: "grey",
          width: "100px",
          height: "100px",
        }}
      >
        <NotificationsIcon sx={{ fontSize: 60 }} />
      </IconButton>
    </Tooltip>
  )
}

export default NotificationsButton

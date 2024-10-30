import React from "react"
import { IconButton, Tooltip, Badge } from "@mui/material"
import PeopleIcon from "@mui/icons-material/People"

/*button on the feed page that will show the user their notifications*/

interface NotificationsButtonProps {
  handleOpenNotifications: (event: React.MouseEvent<HTMLElement>) => void
}

const NotificationsButton: React.FC<NotificationsButtonProps> = ({
  handleOpenNotifications,
}) => {
  return (
    <Tooltip title="Friend Requests" arrow placement="top">
      <IconButton
        onClick={handleOpenNotifications}
        sx={{
          color: "grey",
          width: "100px",
          height: "100px",
        }}
      >
        <PeopleIcon sx={{ fontSize: 60 }} />
      </IconButton>
    </Tooltip>
  )
}

export default NotificationsButton

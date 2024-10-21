import React from "react"
import NotificationItem from "./notificationItem"
import { Box, Typography } from "@mui/material"
import NoNotifications from "./No-Notifcations.png"

interface Notification {
  username: string
  userId: string
}

interface NotificationListProps {
  notifications: Notification[]
  onAccept: (username: string) => void
  onReject: (username: string) => void
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications = [],
  onAccept,
  onReject,
}) => {
  return (
    <>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationItem
            key={notification.userId}
            username={notification.username}
            userId={notification.userId}
            onAccept={onAccept}
            onReject={onReject}
          />
        ))
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
          marginRight="5px"
          minHeight="250px"
        >
          <img
            src={NoNotifications}
            alt={"err"}
            style={{ width: "150px", height: "150px" }}
          />
          <Typography mt={2}>No Notifications Found.</Typography>
        </Box>
      )}
    </>
  )
}

export default NotificationList

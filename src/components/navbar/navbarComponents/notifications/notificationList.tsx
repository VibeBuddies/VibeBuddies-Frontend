import React from "react"
import NotificationItem from "./notificationItem"
import { Box, Typography } from "@mui/material"
import LoadingAnimation from "../../../animations/LoadingAnimation"

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
          minHeight="250px"
        >
          <LoadingAnimation />
        </Box>
      )}
    </>
  )
}

export default NotificationList

import React from "react"
import { Box, Typography, Button } from "@mui/material"
import NotificationItem from "./notificationItem" // Import NotificationItem

// Define the shape of the notification data
interface Notification {
  username: string
  userId: string
}

interface NotificationListProps {
  notifications: Notification[]
  onAccept: (userId: string) => void // Accept button handler passed as a prop
  onReject: (userId: string) => void // Accept button handler passed as a prop
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
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
          justifyContent="center"
          alignItems="center"
          height="100vh" // Full viewport height to vertically center
        >
          <Typography variant="h6" align="center">
            No Pending Friend Requests
          </Typography>
        </Box>
      )}
    </>
  )
}

export default NotificationList

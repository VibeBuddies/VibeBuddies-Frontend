import React, { useState, useEffect } from "react"
import { Popover, Typography, Box } from "@mui/material"
import NotificationList from "./notifications/notificationList"
import organizeData from "./notifications/notificationsDataOrganizer" // Function to fetch friend requests

interface NotificationsProps {
  anchorEl: HTMLElement | null
  handleCloseNotifications: () => void
}

const NotificationsPopover: React.FC<NotificationsProps> = ({
  anchorEl,
  handleCloseNotifications,
}) => {
  const open = Boolean(anchorEl)

  const [notifications, setNotifications] = useState<
    { username: string; userId: string }[]
  >([])

  // Fetch the pending friend requests using the data organizer
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await organizeData()
        setNotifications(data)
      } catch (error) {
        console.log("Failed to fetch notifications:", error)
      }
    }

    fetchNotifications()
  }, [])

  // Handlers for accepting and rejecting
  const handleAccept = (userId: string) => {
    console.log(`Accepted friend request from user with ID: ${userId}`)
  }

  const handleReject = (userId: string) => {
    console.log(`Rejected friend request from user with ID: ${userId}`)
  }

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleCloseNotifications}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Box
        sx={{
          width: 300,
          maxHeight: 400, // Fixed height for the popover
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Title section with sticky positioning and centered text */}
        <Box
          p={2}
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "white", // Match the background color to the popover
            zIndex: 1,
            borderBottom: "1px solid #ccc", // Optional border for better separation
            textAlign: "center", // Center the text
          }}
        >
          <Typography variant="h6">Friend Requests</Typography>
        </Box>

        {/* Scrollable notification list */}
        <Box
          p={2}
          sx={{
            overflowY: "auto",
            maxHeight: 350, // Height for the scrollable area
          }}
        >
          {/* Use NotificationList to display notifications */}
          <NotificationList
            notifications={notifications}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        </Box>
      </Box>
    </Popover>
  )
}

export default NotificationsPopover

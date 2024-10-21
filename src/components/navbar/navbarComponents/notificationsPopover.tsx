import React, { useState, useEffect } from "react"
import { Popover, Typography, Box, Snackbar, Alert } from "@mui/material"
import NotificationList from "./notifications/notificationList"
import organizData from "./notifications/notificationsDataOrganizer"

// define the notification type
interface Notification {
  username: string
  userId: string
}

// define the type for the props
interface NotificationsProps {
  anchorEl: HTMLElement | null
  handleCloseNotifications: () => void
}

const NotificationsPopover: React.FC<NotificationsProps> = ({
  anchorEl,
  handleCloseNotifications,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  )

  const open = Boolean(anchorEl)

  /* THIS BLOCK WILL REFRESH ON AN INTERVAL WORKS
  BUT MAY BE DANGEROUS IN TERMS OF AWS COSTS POSSIBLY
  MUST RESERVE TILL PRESENTATION */

  // function to fetch and update notifications
  const fetchNotifications = async () => {
    const fetchedData = await organizData()

    // compare incoming and current data
    const isDataDifferent =
      JSON.stringify(fetchedData) !== JSON.stringify(notifications)

    // update if incoming data is different
    if (isDataDifferent) {
      setNotifications(fetchedData)
    }
  }

  // periodically fetch data
  useEffect(() => {
    fetchNotifications()

    const intervalId = setInterval(() => {
      fetchNotifications()
    }, 3600000)

    return () => clearInterval(intervalId)
  }, [notifications])

  // fetch notifications
  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     const fetchedData = await organizData()
  //     setNotifications(fetchedData)
  //   }

  //   fetchNotifications()
  // }, [])

  const handleAccept = (username: string) => {
    setSnackbarMessage(`You are now friends with ${username}!`)
    setSnackbarSeverity("success")
    setSnackbarOpen(true)
    // update notifications to remove the accepted friend request
    setNotifications((prev) => prev.filter((n) => n.username !== username))
  }

  const handleReject = (username: string) => {
    setSnackbarMessage(`Friend request from ${username} denied`)
    setSnackbarSeverity("success")
    setSnackbarOpen(true)
    // update notifications to remove the rejected friend request
    setNotifications((prev) => prev.filter((n) => n.username !== username))
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  return (
    <>
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
            width: 500,
            height: 400,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            p={2}
            sx={{
              position: "sticky",
              top: 0,
              backgroundColor: "white",
              zIndex: 1,
              borderBottom: "0px solid #ccc",
              textAlign: "center",
            }}
          >
            <Typography variant="h6">Friend Requests</Typography>
          </Box>

          <Box
            p={2}
            sx={{
              overflowY: "auto",
              maxHeight: 350,
            }}
          >
            <NotificationList
              notifications={notifications}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          </Box>
        </Box>
      </Popover>

      {/* Snackbar for success or error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ zIndex: 1300 }}
        color={snackbarSeverity}
      >
        <Alert variant="filled">{snackbarMessage}</Alert>
      </Snackbar>
    </>
  )
}

export default NotificationsPopover

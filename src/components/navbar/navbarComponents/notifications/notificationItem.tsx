import React from "react"
import { Box, Typography, Button } from "@mui/material"

interface NotificationItemProps {
  username: string
  userId: string
  onAccept: (userId: string) => void // Handler for accepting the request
  onReject: (userId: string) => void // Handler for rejecting the request
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  username,
  userId,
  onAccept,
  onReject,
}) => {
  return (
    <Box
      p={2}
      mb={2}
      border={1}
      borderRadius={5}
      borderColor="grey.300"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography variant="subtitle1">{username}</Typography>
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onAccept(userId)} // Trigger the onAccept callback
          sx={{ mr: 2 }} // Add margin between the buttons
        >
          Accept
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onReject(userId)} // Trigger the onReject callback
        >
          Reject
        </Button>
      </Box>
    </Box>
  )
}

export default NotificationItem

import React from "react"
import { Box, Typography, IconButton, Card, CardContent } from "@mui/material"
import updateFriendRequest from "../../../../api/updateFriendRequestApi"
import defaultAvi from "./default-avi.jpg"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"

interface NotificationItemProps {
  username: string
  userId: string
  onAccept: (username: string) => void
  onReject: (username: string) => void
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  username,
  userId,
  onAccept,
  onReject,
}) => {
  const handleAccept = async () => {
    try {
      await updateFriendRequest(username, "accepted")
      onAccept(username)
    } catch (error) {
      console.error(`Error accepting friend request for ${username}:`, error)
    }
  }

  const handleReject = async () => {
    try {
      await updateFriendRequest(username, "denied")
      onReject(username)
    } catch (error) {
      console.error(`Error rejecting friend request for ${username}:`, error)
    }
  }

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Box mr={2}>
              <img
                src={defaultAvi}
                alt={"err"}
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
            </Box>
            <Typography variant="body1">{username}</Typography>
          </Box>
          <Box display="flex">
            <IconButton
              sx={{
                color: "grey",
                width: "40px",
                height: "40px",
              }}
              onClick={handleAccept}
            >
              <PersonAddIcon sx={{ fontSize: 30 }} />
            </IconButton>
            <IconButton
              onClick={handleReject}
              sx={{
                ml: 1,
                width: "40px",
                height: "40px",
              }}
            >
              <PersonRemoveIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default NotificationItem

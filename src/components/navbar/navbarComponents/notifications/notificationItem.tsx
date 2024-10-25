import React, { useContext } from "react"
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Avatar,
} from "@mui/material"
import updateFriendRequest from "../../../../api/updateFriendRequestApi"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
import { UserContext } from "../../../Context/UserContext"
import { Link } from "react-router-dom"

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

  const { username: contextUsername } = useContext(UserContext)!

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Box mr={2}>
              <Avatar alt={contextUsername} sx={{ width: 40, height: 40 }}>
                {contextUsername.charAt(0).toUpperCase()}
              </Avatar>
            </Box>
            {/* clickable link username */}
            <Typography variant="subtitle1" fontWeight="bold">
              <Link
                to={`/profile/${username}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                {username}
              </Link>
            </Typography>
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

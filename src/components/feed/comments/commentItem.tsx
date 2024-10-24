import React, { useContext, useEffect, useState } from "react"
import { Box, Typography, Rating } from "@mui/material"

interface CommentItemProps {
  username: string
  user_id: string
  comment_id: string
  comment_body: string
  timestamp: number
}

const CommentItem: React.FC<CommentItemProps> = ({
  username,
  user_id,
  comment_id,
  comment_body,
  timestamp,
}) => {
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Typography>Username: {username}</Typography>
      <Typography>User ID: {user_id}</Typography>
      <Typography>Comment ID: {comment_id}</Typography>
      <Typography>Comment body: {comment_body}</Typography>
      <Typography>Timestamp : {timestamp}</Typography>
    </Box>
  )
}

export default CommentItem

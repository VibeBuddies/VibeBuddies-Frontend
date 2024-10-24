import React, { useState, useEffect, useContext } from "react"
import { Container, Box } from "@mui/material"
import CommentList from "./commentList"

interface Comment {
  username: string
  user_id: string
  comment_id: string
  comment_body: string
  timestamp: number
}

const commentFeed: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([])

  return <div></div>
}

export default commentFeed

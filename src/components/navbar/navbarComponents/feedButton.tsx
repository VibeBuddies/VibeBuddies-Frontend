import React from "react"
import { IconButton, Tooltip } from "@mui/material"
import BallotIcon from "@mui/icons-material/Ballot"
import { useNavigate } from "react-router-dom"

/* feed button on the navbar which will navigate 
the user to their feed */

const FeedButton: React.FC = () => {
  const navigate = useNavigate()

  //navigate to the feed page on button click
  const handleFeedClick = () => {
    navigate("/feed")
  }

  return (
    <Tooltip title="Go to Feed" arrow placement="bottom">
      <IconButton
        onClick={handleFeedClick}
        sx={{
          color: "grey",
          width: "100px",
          height: "100px",
        }}
      >
        <BallotIcon sx={{ fontSize: 60 }} />
      </IconButton>
    </Tooltip>
  )
}

export default FeedButton

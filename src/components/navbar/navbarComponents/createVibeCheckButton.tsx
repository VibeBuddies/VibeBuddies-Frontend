import React from "react"
import { IconButton, Tooltip } from "@mui/material"
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined"

/*button on the feed page that will prompt the user to create a new vibecheck */

interface CreateVibeCheckButtonProps {
  handleOpenVibeCheck: () => void
}

const CreateVibeCheckButton: React.FC<CreateVibeCheckButtonProps> = ({
  handleOpenVibeCheck,
}) => {
  return (
    <Tooltip title="Create VibeCheck" arrow placement="top">
      <IconButton
        onClick={handleOpenVibeCheck}
        sx={{
          color: "grey",
          width: "100px",
          height: "100px",
        }}
      >
        <AddBoxOutlinedIcon sx={{ fontSize: 60 }} />
      </IconButton>
    </Tooltip>
  )
}

export default CreateVibeCheckButton

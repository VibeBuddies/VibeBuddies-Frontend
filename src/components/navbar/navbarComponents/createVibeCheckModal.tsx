import React from "react"
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material"

/* modal from the createVibeCheck button that will display a form prompting the user to create
 a vibeCheck. Album name, album art, and artist name will all come from last.fm api */

interface CreateVibeCheckModalProps {
  openVibeCheck: boolean
  handleCloseVibeCheck: () => void
}

const CreateVibeCheckModal: React.FC<CreateVibeCheckModalProps> = ({
  openVibeCheck,
  handleCloseVibeCheck,
}) => {
  return (
    <Dialog open={openVibeCheck} onClose={handleCloseVibeCheck}>
      <DialogTitle>Create a New VibeCheck</DialogTitle>
      <DialogActions>
        <Button onClick={handleCloseVibeCheck} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateVibeCheckModal

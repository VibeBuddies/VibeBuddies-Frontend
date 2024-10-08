import React from "react"
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material"

/* modal that will display the comments section for
 a vibeCheck and give a user the ability to add their
 own comments */

interface CommentModalProps {
  open: boolean
  handleClose: () => void
  album: string
}

const CommentModal: React.FC<CommentModalProps> = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle></DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CommentModal

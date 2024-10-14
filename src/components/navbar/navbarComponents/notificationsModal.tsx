import React from "react"
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material"

/* modal from the createVibeCheck button that will display a form prompting the user to create
 a vibeCheck. Album name, album art, and artist name will all come from last.fm api */

interface NotificationsProps {
  openNotifications: boolean
  handleCloseNotifications: () => void
}

const NotificationsModal: React.FC<NotificationsProps> = ({
  openNotifications,
  handleCloseNotifications,
}) => {
  return (
    <Dialog open={openNotifications} onClose={handleCloseNotifications}>
      <DialogTitle>Notifs</DialogTitle>
      <DialogActions>
        <Button onClick={handleCloseNotifications} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NotificationsModal

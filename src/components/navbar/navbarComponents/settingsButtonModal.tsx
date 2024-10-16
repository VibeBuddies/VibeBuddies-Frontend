import React from "react"
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Box,
} from "@mui/material"

/* settings button modal that will display user settings:
 * Users can log off.
 * Users can request to delete their account.
 * Users can change their password.
 */

interface SettingsButtonModalProps {
  openSettings: boolean
  handleCloseSettings: () => void
  handleLogOff: () => void
  handleDeleteAccount: () => void
  handleChangePassword: () => void
}

const SettingsButtonModal: React.FC<SettingsButtonModalProps> = ({
  openSettings,
  handleCloseSettings,
  handleLogOff,
  handleDeleteAccount,
  handleChangePassword,
}) => {
  return (
    <Dialog
      open={openSettings}
      onClose={handleCloseSettings}
      BackdropProps={{
        sx: {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
      }}
      PaperProps={{
        sx: {
          backgroundColor: "white",
          borderRadius: 2,
          padding: "2rem",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          maxWidth: "400px",
        },
      }}
    >
      <DialogTitle>User Settings</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column">
          {/* Change Password Button */}
          <Button
            onClick={handleChangePassword}
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
          >
            Change Password
          </Button>

          {/* Delete Account Button */}
          <Button
            onClick={handleDeleteAccount}
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
          >
            Delete Account
          </Button>

          {/* Log Off Button */}
          <Button onClick={handleLogOff} variant="contained" color="primary">
            Log Off
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseSettings} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SettingsButtonModal

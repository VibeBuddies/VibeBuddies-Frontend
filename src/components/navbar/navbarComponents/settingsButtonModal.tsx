import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Box,
  TextField,
  Typography,
  IconButton,
} from "@mui/material"
import { Close as CloseIcon } from "@mui/icons-material"
import { AuthContext } from "../../Context/AuthContext"
import deleteAccount from "../../../api/deleteAccountApi"
import ChangePasswordModal from "./ChangePasswordModal"

/* settings button modal that will display user settings:
 * Users can log off.
 * Users can request to delete their account.
 * Users can change their password.
 */

interface SettingsButtonModalProps {
  openSettings: boolean
  handleCloseSettings: () => void
  handleChangePassword: () => void
}

const SettingsButtonModal: React.FC<SettingsButtonModalProps> = ({
  openSettings,
  handleCloseSettings,
}) => {
  const { logOff } = useContext(AuthContext)! // not-null assertion needed!
  const navigate = useNavigate()

  const [confirmationText, setConfirmationText] = useState<string>("")
  const [showConfirmationInput, setShowConfirmationInput] = useState(false)
  const [openChangePassword, setOpenChangePassword] = useState(false);

  const handleLogOff = () => {
    logOff()
    navigate("/")
  }

  const handleDeleteAccount = async () => {
    if (confirmationText === "I am sure") {
      try {
        await deleteAccount()
        navigate("/")
      } catch (err) {
        console.log("failed to delete account: ", err)
      }
    } else {
      console.log("Incorrect confirmation text")
    }
  }

  const handleShowConfirmation = () => {
    setShowConfirmationInput(true)
  }

  const handleCancelConfirmation = () => {
    setShowConfirmationInput(false)
    setConfirmationText("")
  }

  const handleChangePassword = () => setOpenChangePassword(true);
  const handleCloseChangePassword = () => setOpenChangePassword(false);
  

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
          {/* change password modal */}
          <ChangePasswordModal
          open={openChangePassword}
          onClose={handleCloseChangePassword}
          />

          {/* Delete Account Button */}
          {!showConfirmationInput ? (
            <Button
              onClick={handleShowConfirmation}
              variant="contained"
              color="primary"
              sx={{ mb: 2 }}
            >
              Delete Account
            </Button>
          ) : (
            <>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography>
                  Type <strong>"I am sure"</strong> to confirm account deletion.
                </Typography>
                <IconButton onClick={handleCancelConfirmation} size="small">
                  <CloseIcon />
                </IconButton>
              </Box>
              <TextField
                fullWidth
                variant="outlined"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                placeholder="I am sure"
                sx={{ mb: 2 }}
              />
              <Button
                onClick={handleDeleteAccount}
                variant="contained"
                color="primary"
                disabled={confirmationText !== "I am sure"}
              >
                Confirm Delete
              </Button>
            </>
          )}

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

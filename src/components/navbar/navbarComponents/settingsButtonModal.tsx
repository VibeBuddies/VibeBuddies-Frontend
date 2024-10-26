import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  Box,
  TextField,
  Typography,
  IconButton,
} from "@mui/material"
import { Close as CloseIcon } from "@mui/icons-material"
import { AuthContext } from "../../Context/AuthContext"
import deleteAccount from "../../../api/deleteAccountApi"
import ChangePasswordModal from "./ChangePasswordModal"
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle"
import DeleteIcon from "@mui/icons-material/Delete"
import LogoutIcon from "@mui/icons-material/Logout"

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
  const { logOff } = useContext(AuthContext)!
  const navigate = useNavigate()

  const [confirmationText, setConfirmationText] = useState<string>("")
  const [showConfirmationInput, setShowConfirmationInput] = useState(false)
  const [openChangePassword, setOpenChangePassword] = useState(false)

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

  const handleChangePassword = () => setOpenChangePassword(true)
  const handleCloseChangePassword = () => setOpenChangePassword(false)

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
      <DialogContent sx={{ position: "absolute", top: 1, right: 1 }}>
        <IconButton onClick={handleCloseSettings}>
          <CloseIcon />
        </IconButton>
      </DialogContent>
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems={"flex-start"}
          marginRight={1}
        >
          {/* Change Password Button */}
          <IconButton
            onClick={handleChangePassword}
            sx={{
              borderRadius: 1,
            }}
          >
            <ChangeCircleIcon />
            <Typography ml={1}>Change Password</Typography>
          </IconButton>

          {/* Change password modal */}
          <ChangePasswordModal
            open={openChangePassword}
            onClose={handleCloseChangePassword}
          />

          {/* Delete Account Button */}
          {!showConfirmationInput ? (
            <IconButton
              onClick={handleShowConfirmation}
              sx={{
                borderRadius: 1,
              }}
            >
              <DeleteIcon />
              <Typography ml={1}>Delete Account</Typography>
            </IconButton>
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
              <IconButton
                onClick={handleDeleteAccount}
                disabled={confirmationText !== "I am sure"}
                sx={{
                  borderRadius: 1,
                }}
              >
                <DeleteIcon />
                <Typography ml={1}>Delete Account</Typography>
              </IconButton>
            </>
          )}

          {/* Log Off Button */}
          <Box ml={0.5}>
            <IconButton
              onClick={handleLogOff}
              sx={{
                borderRadius: 1,
              }}
            >
              <LogoutIcon />
              <Typography ml={1}>Log Off</Typography>
            </IconButton>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default SettingsButtonModal

import React, { useState, ChangeEvent } from "react"
import { Box } from "@mui/material"
import SearchBar from "./navbarComponents/searchBar"
import CreateVibeCheckButton from "./navbarComponents/createVibeCheckButton"
import CreateVibeCheckModal from "./navbarComponents/createVibeCheckModal"
import ProfileButton from "./navbarComponents/profileButton"
import SettingsButton from "./navbarComponents/settingsButton"
import SettingsButtonModal from "./navbarComponents/settingsButtonModal"
import FeedButton from "./navbarComponents/feedButton"
import NotificationsButton from "./navbarComponents/notificationButton"
import NotificationsPopover from "./navbarComponents/notificationsPopover"
import {
  logoffUser,
  deleteUserAccount,
  changeUserPassword,
} from "../../api/settingsApi"

import Snackbar from "@mui/joy/Snackbar"

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [openVibeCheckModal, setOpenVibeCheckModal] = useState<boolean>(false)
  const [openSettingsModal, setOpenSettingsModal] = useState<boolean>(false)
  const [notificationAnchorEl, setNotificationAnchorEl] =
    useState<HTMLElement | null>(null)
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)

  const mockNotifications = [
    "You have a new friend request.",
    "Someone liked your VibeCheck!",
    "Your password has been updated.",
  ] // Mock notifications

  // Handle the search input change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase())
  }

  const handleOpenVibeCheck = () => setOpenVibeCheckModal(true)
  const handleCloseVibeCheck = () => setOpenVibeCheckModal(false)
  const handleOpenSettings = () => setOpenSettingsModal(true)
  const handleCloseSettings = () => setOpenSettingsModal(false)

  // Notification handling (open and close)
  const handleOpenNotifications = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget)
  }

  const handleCloseNotifications = () => {
    setNotificationAnchorEl(null)
  }

  // Dummy functions for user settings
  const handleLogOff = () => {
    console.log("User Logged Off")
  }

  const handleDeleteAccount = () => {
    console.log("User Requested to Delete Account")
  }

  const handleChangePassword = () => {
    console.log("User Requested to Change Password")
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <Box sx={{ alignItems: "right" }}>
        <FeedButton />
      </Box>
      <Box>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
      </Box>
      <Box>
        <CreateVibeCheckButton handleOpenVibeCheck={handleOpenVibeCheck} />
        <CreateVibeCheckModal
          openVibeCheck={openVibeCheckModal}
          handleCloseVibeCheck={handleCloseVibeCheck}
          setSnackbarOpen={setSnackbarOpen}
        />

        {/* Notifications Button and Popover */}
        <NotificationsButton
          handleOpenNotifications={handleOpenNotifications}
          notificationCount={mockNotifications.length}
        />
        <NotificationsPopover
          // mui property that dertemines the position of the popover
          anchorEl={notificationAnchorEl}
          handleCloseNotifications={handleCloseNotifications}
        />

        <SettingsButton handleOpenSettings={handleOpenSettings} />
        <SettingsButtonModal
          openSettings={openSettingsModal}
          handleCloseSettings={handleCloseSettings}
          handleChangePassword={handleChangePassword}
        />
        <ProfileButton />
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        color="success"
        size="md"
        variant="solid"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ zIndex: 1300 }}
      >
        Success! VibeCheck submitted.
      </Snackbar>
    </Box>
  )
}

export default Navbar

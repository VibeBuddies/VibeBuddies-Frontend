import React, { useState, ChangeEvent } from "react"
import { Box } from "@mui/material"
import SearchBar from "./navbarComponents/searchBar"
import CreateVibeCheckButton from "./navbarComponents/createVibeCheckButton"
import CreateVibeCheckModal from "./navbarComponents/createVibeCheckModal"
import ProfileButton from "./navbarComponents/profileButton"
import SettingsButton from "./navbarComponents/settingsButton"
import SettingsButtonModal from "./navbarComponents/settingsButtonModal"
import FeedButton from "./navbarComponents/feedButton"
import GlobalFeedButton from "./navbarComponents/globalFeedButton"
import NotificationsButton from "./navbarComponents/notificationButton"
import NotificationsPopover from "./navbarComponents/notificationsPopover"
import Snackbar from "@mui/joy/Snackbar"

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [openVibeCheckModal, setOpenVibeCheckModal] = useState<boolean>(false)
  const [openSettingsModal, setOpenSettingsModal] = useState<boolean>(false)
  const [notificationAnchorEl, setNotificationAnchorEl] =
    useState<HTMLElement | null>(null)

  //snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>("")
  const [isSuccess, setIsSuccess] = useState<boolean>(true)

  //snackbar for when a vibecheck gets made
  const handleVibeCheckResponse = (message: string, success: boolean) => {
    setSnackbarMessage(message)
    setIsSuccess(success)
    setSnackbarOpen(true)
  }

  //input for the search bar
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  //navbar button handling
  const handleOpenVibeCheck = () => setOpenVibeCheckModal(true)
  const handleCloseVibeCheck = () => setOpenVibeCheckModal(false)
  const handleOpenSettings = () => setOpenSettingsModal(true)
  const handleCloseSettings = () => setOpenSettingsModal(false)
  const handleOpenNotifications = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget)
  }
  const handleCloseNotifications = () => {
    setNotificationAnchorEl(null)
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
      {/* items to the lefts of the searchbar*/}
      <Box sx={{ alignItems: "right" }}>
        {/* Button to go the friend feed */}
        <FeedButton />
      </Box>
      <Box sx={{ alignItems: "right" }}>
        {/* Button to go the global feed */}
        <GlobalFeedButton />
      </Box>
      <Box>
        {/* searchbar */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
      </Box>
      {/* Items to the right of the search bar*/}
      <Box>
        {/* Button and modal to create a vibecheck*/}
        <CreateVibeCheckButton handleOpenVibeCheck={handleOpenVibeCheck} />
        <CreateVibeCheckModal
          openVibeCheck={openVibeCheckModal}
          handleCloseVibeCheck={handleCloseVibeCheck}
          onVibeCheckResponse={handleVibeCheckResponse}
        />

        {/* Notifications Button and Popover */}
        <NotificationsButton
          handleOpenNotifications={handleOpenNotifications}
        />
        <NotificationsPopover
          // mui property that dertemines the position of the popover
          anchorEl={notificationAnchorEl}
          handleCloseNotifications={handleCloseNotifications}
        />
        {/* Button and modal to create a vibecheck*/}
        <SettingsButton handleOpenSettings={handleOpenSettings} />
        <SettingsButtonModal
          openSettings={openSettingsModal}
          handleCloseSettings={handleCloseSettings}
        />
        {/* profile button*/}
        <ProfileButton />
      </Box>
      {/* snackbar triggers by creating a vibecheck*/}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        color={isSuccess ? "success" : "danger"}
        size="md"
        variant="solid"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ zIndex: 1300 }}
      >
        {snackbarMessage}
      </Snackbar>
    </Box>
  )
}

export default Navbar

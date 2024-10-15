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
import NotificationsModal from "./navbarComponents/notificationsModal"
//api functions imported need to implement
import {
  logoffUser,
  deleteUserAccount,
  changeUserPassword,
} from "../../api/settingsApi"

//success snackbar for createVibeCheckModal
import Snackbar from '@mui/joy/Snackbar';

/* creates a navbar that sits on top of every visitable
page on the app after logging in. Includes a button to 
navigate to the feed and profile. Includes a button which
toggles a modal that lets a user create a vibeCheck
and a button that toggles a modal that allows a user to
change settings */

const Navbar: React.FC = () => {
  //for the search bar
  const [searchTerm, setSearchTerm] = useState<string>("")
  //for the modals
  const [openVibeCheckModal, setOpenVibeCheckModal] = useState<boolean>(false) // State for controlling the vibecheck modal
  const [openSettingsModal, setOpenSettingsModal] = useState<boolean>(false) // State for controlling the settings modal
  const [openNotificationsModal, setOpenNotificationsModal] =
    useState<boolean>(false) // State for controlling the notifications modal
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);// success created vibecheck snackbar

  // Handle the search input change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase())
  }

  // more logic for the modals opening and closing
  const handleOpenVibeCheck = () => setOpenVibeCheckModal(true)
  const handleCloseVibeCheck = () => setOpenVibeCheckModal(false)
  const handleOpenSettings = () => setOpenSettingsModal(true)
  const handleCloseSettings = () => setOpenSettingsModal(false)
  const handleOpenNotifications = () => setOpenNotificationsModal(true)
  const handleCloseNotifications = () => setOpenNotificationsModal(false)
  
  

  // function for a user to log off from the modal
  const handleLogOff = () => {
    console.log("User Logged Off") // Replace this with real logoff functionality
  }

  // function for a user to delete their account
  const handleDeleteAccount = () => {
    console.log("User Requested to Delete Account") // Replace this with actual delete account functionality
  }

  // function for a user to change their password
  const handleChangePassword = () => {
    console.log("User Requested to Change Password") // Replace this with change password functionality
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "",
      }}
    >
      <Box sx={{ alignItems: "right" }}>
        <FeedButton />
      </Box>
      <Box sx={{}}>
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
        {/* wrong icon somehow? */}
        <NotificationsButton
          handleOpenNotifications={handleOpenNotifications}
        />
        <NotificationsModal
          openNotifications={openNotificationsModal}
          handleCloseNotifications={handleCloseNotifications}
        />
        <SettingsButton handleOpenSettings={handleOpenSettings} />
        <SettingsButtonModal
          openSettings={openSettingsModal}
          handleCloseSettings={handleCloseSettings}
          handleLogOff={handleLogOff}
          handleDeleteAccount={handleDeleteAccount}
          handleChangePassword={handleChangePassword}
        />
        <ProfileButton />
      </Box>
      <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)} // Optional, close it manually if needed
                color="success"
                size="md"
                variant="solid"
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Set position to top center
                sx={{ zIndex: 1300 }} // Ensure it's above the modal
            >
                Success! VibeCheck submitted.
      </Snackbar>
    </Box>
  )
}

export default Navbar

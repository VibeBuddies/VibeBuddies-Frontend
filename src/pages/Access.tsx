import React, { useState } from "react"
import { Typography, Box } from "@mui/material"
import RegisterContainer from "../components/auth/Registration/RegisterContainer"
import LoginContainer from "../components/auth/Login/LoginContainer"
import LoginRegisterToggle from "../components/auth/LoginRegisterToggle"
import vibeBuddiesLogo from "../components/auth/vibebuddies.png"

/* arranges the access componenets into an Access page 
which is the first point of entry and requires logging in
or registering in order to move on to the rest of the site*/

const Access: React.FC = () => {
  //state to toggle between log in and register
  const [showLogin, setShowLogin] = useState<boolean>(true)

  return (
    //box containing the image box and the form box
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* box containing the vibeBuddies logo image */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          marginRight: "200px",
          marginTop: "100px",
        }}
      >
        <img
          src={vibeBuddiesLogo}
          alt="VibeBuddies Logo"
          style={{ width: "750px", height: "auto" }}
        />
      </Box>

      {/* box containing the registration/login form */}
      <Box
        width="30vw"
        p={3}
        border={1}
        borderColor="grey.400"
        borderRadius={5}
        textAlign="center"
        sx={{
          minHeight: "450px",
        }}
      >
        {/* This box contains the buttons in the form that will toggle between login and register, looks like: "Login | Register" */}
        <LoginRegisterToggle
          showLogin={showLogin}
          setShowLogin={setShowLogin}
        />

        {/* conditionally renders RegisterContainer or LoginContainer components based on which button is clicked */}
        {showLogin ? <LoginContainer /> : <RegisterContainer />}
      </Box>
    </Box>
  )
}

export default Access

import React, { useState } from "react"
import { Typography, Box } from "@mui/material"
import Register from "../components/auth/register"
import Login from "../components/auth/Login"
import vibeBuddiesLogo from "../components/auth/vibebuddies.png"
import { useNavigate } from "react-router-dom" // Import useNavigate from react-router-dom

/* arranges the access componenets into an Access page 
which is the first point of entry and requires logging in
or registering in order to move on to the rest of the site*/

const Access: React.FC = () => {
  // toggles between login and register inside of the login/register form box
  const [showLogin, setShowLogin] = useState<boolean>(true)

  // initialize the useNavigate hook to navigate between pages
  const navigate = useNavigate()

  // if login is succecful users should be taken to the feed
  const handleLoginSuccess = () => {
    navigate("/feed") // Navigate to the Feed page after login
  }

  //if registration is succecful users should be taken to the feed
  const handleRegistrationSuccess = () => {
    navigate("/feed")
  }

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
          marginRight: "200px", // adds needed space between the logo image and the form box
          marginTop: "100px",
        }}
      >
        <img
          src={vibeBuddiesLogo}
          alt="VibeBuddies Logo"
          style={{ width: "750px", height: "auto" }} // actual size of the vibeBuddies logo
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
          minHeight: "450px", // Fixed minimum height so that the form box size won't change while toggling between login and register
        }}
      >
        {/* This box contains the buttons in the form that will toggle between login and register, looks like: "Login | Register" */}
        <Box display="flex" justifyContent="center" mb={3}>
          {/* login button that sets the form to login mode */}
          <Typography
            variant="h4"
            onClick={() => setShowLogin(true)}
            sx={{
              cursor: "pointer",
              fontWeight: showLogin ? "bold" : "normal",
              color: showLogin ? "#1976D2" : "grey",
              "&:hover": {
                color: "#1976D2", // Hover color for login
              },
            }}
          >
            Login
          </Typography>

          {/* spacer separating login and register */}
          <Typography variant="h4" sx={{ mx: 2 }}>
            |
          </Typography>

          {/* register button that sets the form to register mode */}
          <Typography
            variant="h4"
            onClick={() => setShowLogin(false)}
            sx={{
              cursor: "pointer",
              fontWeight: !showLogin ? "bold" : "normal",
              color: !showLogin ? "#1976D2" : "grey",
              "&:hover": {
                color: "#1976D2", // Hover color for register
              },
            }}
          >
            Register
          </Typography>
        </Box>

        {/* conditionally renders Register or Login components based on which button is clicked */}
        {showLogin ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <Register onRegistrationSuccess={handleRegistrationSuccess} />
        )}
      </Box>
    </Box>
  )
}

export default Access

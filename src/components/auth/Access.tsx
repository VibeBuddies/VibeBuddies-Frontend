import React, { useState } from "react"
import { Typography, Box } from "@mui/material"
import Register from "./register"
import Login from "./Login"
import vibeBuddiesLogo from "../../vibebuddies.png"

const Access: React.FC = () => {
  // toggles between login and register inside of the login/register form box
  const [showLogin, setShowLogin] = useState<boolean>(true) // TypeScript inferred the type, but we explicitly set it to boolean.

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

        {/* conditionally renders Register or Login component based on which button is clicked */}
        {showLogin ? (
          <Login
            onLoginSuccess={function (): void {
              throw new Error("Function not implemented.")
            }}
          />
        ) : (
          <Register />
        )}
      </Box>
    </Box>
  )
}

export default Access

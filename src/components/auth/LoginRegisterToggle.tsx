import React from "react"
import { Box, Typography } from "@mui/material"

interface LoginRegisterToggleProps {
  showLogin: boolean
  setShowLogin: (show: boolean) => void // Updated prop type
}

const LoginRegisterToggle: React.FC<LoginRegisterToggleProps> = ({
  showLogin,
  setShowLogin,
}) => (
  <Box display="flex" justifyContent="center" mb={3}>
    <Typography
      variant="h4"
      onClick={() => setShowLogin(true)}
      sx={{
        cursor: "pointer",
        fontWeight: showLogin ? "bold" : "normal",
        color: showLogin ? "#1976D2" : "grey",
        "&:hover": {
          color: "#1976D2",
        },
      }}
    >
      Login
    </Typography>

    <Typography variant="h4" sx={{ mx: 2 }}>
      |
    </Typography>

    <Typography
      variant="h4"
      onClick={() => setShowLogin(false)}
      sx={{
        cursor: "pointer",
        fontWeight: !showLogin ? "bold" : "normal",
        color: !showLogin ? "#1976D2" : "grey",
        "&:hover": {
          color: "#1976D2",
        },
      }}
    >
      Register
    </Typography>
  </Box>
)

export default LoginRegisterToggle

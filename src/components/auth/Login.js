import React, { useState } from "react"
import { TextField, Button, Container, Typography, Alert } from "@mui/material"

/* creates a registration form complete with 2 fields to fill out and a button to submit the form */
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    // For now, just clear the form and show a message if needed
    if (formData.email === "" || formData.password === "") {
      setError("Both email and password are required")
    } else {
      setError("")
      setIsLoggedIn(true)
    }

    // Clear form after submission
    setFormData({ email: "", password: "" })
    setError("")
  }

  return (
    <Container maxWidth="sm">
      {isLoggedIn ? (
        <Typography variant="h4">Welcome Back!</Typography>
      ) : (
        <>
          {error && <Alert severity="error">{error}</Alert>}
          {/* when the login button is clicked this will trigger the function to check the filled out fields*/}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{
                mt: 2,
                backgroundColor: "rgba(0, 149, 246, 1)", // Set the background color
                "&:hover": {
                  backgroundColor: "#1565C0", // Hover color
                },
              }}
            >
              Login
            </Button>
          </form>
        </>
      )}
    </Container>
  )
}

export default Login

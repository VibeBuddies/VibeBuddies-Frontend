import React, { useState, ChangeEvent, FormEvent } from "react"
import { TextField, Button, Container, Typography, Alert } from "@mui/material"

// Define the type for props
interface LoginProps {
  onLoginSuccess: () => void // onLoginSuccess is a function with no arguments and no return value
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  // State for form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  // State for errors
  const [error, setError] = useState<string>("")

  // Handle form submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Simple validation
    if (formData.email === "" || formData.password === "") {
      setError("Both email and password are required")
      return
    }

    // Clear errors
    setError("")

    // Call the function to navigate to the feed
    onLoginSuccess()

    // Clear form after submission
    setFormData({ email: "", password: "" })
  }

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <Container maxWidth="sm">
      <>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email" // Added name attribute
            type="email"
            margin="normal"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password" // Added name attribute
            type="password"
            margin="normal"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{
              mt: 2,
              backgroundColor: "rgba(0, 149, 246, 1)",
              "&:hover": {
                backgroundColor: "#1565C0",
              },
            }}
          >
            Login
          </Button>
        </form>
      </>
    </Container>
  )
}

export default Login

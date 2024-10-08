import React, { useState, ChangeEvent, FormEvent } from "react"
import { TextField, Button, Container, Typography, Alert } from "@mui/material"

/* log in component of the Access page.
if the formData is filled out correctly this will
give access to the feed page. in the future only if
a user is logged in succecfully through an API req
then they will be given a token and granted access
to the rest of the website */

/* Define the shape of the form data */
interface FormData {
  email: string
  password: string
}

// Define the type for props
interface LoginProps {
  onLoginSuccess: () => void
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  // State for form data
  const [formData, setFormData] = useState<FormData>({
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

    /*for now this will always give access to feed
    so long as formData is filled out correctly.
    for the future the api will be called and if it
    is a valid user login then a jwt token will be given */
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
            name="email"
            type="email"
            margin="normal"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
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

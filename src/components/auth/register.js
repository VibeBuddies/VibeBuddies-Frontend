import React, { useState } from "react"
import { TextField, Button, Container, Alert } from "@mui/material"

/* creates a registration form complete with 3 fields to fill out (+ confirm password) and a button to submit the form */
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic password match validation
    if (formData.password !== formData.confirmPassword) {
      setErrors("Passwords do not match!")
      return
    }

    // clears the form fields
    setFormData({ username: "", email: "", password: "", confirmPassword: "" })
    setErrors("") // Clear any previous errors
  }

  return (
    <Container maxWidth="sm">
      {errors && <Alert severity="error">{errors}</Alert>}
      {/* when the registration button is clicked this will trigger the function to check the filled out fields*/}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          margin="normal"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          margin="normal"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
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
            backgroundColor: "rgba(0, 149, 246, 1)",
            "&:hover": {
              backgroundColor: "#1565C0",
            },
          }}
        >
          Register
        </Button>
      </form>
    </Container>
  )
}

export default Register

import React, { useState, ChangeEvent, FormEvent } from "react"
import { TextField, Button, Container, Alert } from "@mui/material"

/* Define the shape of the form data */
interface FormData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const Register: React.FC = () => {
  // State for form data
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // State for errors
  const [errors, setErrors] = useState<string>("")

  // Handle form submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Basic password match validation
    if (formData.password !== formData.confirmPassword) {
      setErrors("Passwords do not match!")
      return
    }

    // Clear the form fields and errors
    setFormData({ username: "", email: "", password: "", confirmPassword: "" })
    setErrors("") // Clear any previous errors
  }

  // Handle input change
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <Container maxWidth="sm">
      {errors && <Alert severity="error">{errors}</Alert>}
      {/* When the registration button is clicked, this will trigger the function to check the filled-out fields */}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          name="username" // Add name attribute for input handling
          margin="normal"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email" // Add name attribute for input handling
          type="email"
          margin="normal"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <TextField
          fullWidth
          label="Password"
          name="password" // Add name attribute for input handling
          type="password"
          margin="normal"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword" // Add name attribute for input handling
          type="password"
          margin="normal"
          value={formData.confirmPassword}
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
          Register
        </Button>
      </form>
    </Container>
  )
}

export default Register

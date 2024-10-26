import React, { useState, ChangeEvent, FormEvent } from "react"
import { TextField, Button, Container, Alert, Snackbar } from "@mui/material"
import { register as registerApi } from "../../api/registerApi"

/* registration component of the Access page
if the formData is filled out correctly this will
give access to the feed page in the future only if 
a user is registered succefully will they then be able to log in
and be given a jwt to then be granted into the rest of the app */

/* Define the shape of the form data */
interface FormData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const Register: React.FC = () => {
  // state for form data
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // state for errors
  const [errors, setErrors] = useState<string>("")
  // state for snackbar
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>("")

  // Handle form submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // basic password match validation and ensuring all fields are filled out
    if (formData.password !== formData.confirmPassword) {
      setErrors("Passwords do not match!")
      return
    } else if (
      formData.email === "" ||
      formData.password === "" ||
      formData.username === "" ||
      formData.confirmPassword === ""
    ) {
      setErrors("All fields are required.")
      return
    }

    try {
      const response = await registerApi({
        username: formData.username,
        password: formData.password,
        email: formData.email,
      })

      // if registration is successful display snackbar
      if (response.data.status === "success") {
        setSnackbarMessage("Registration successful!")
        setSnackbarOpen(true) // Open the snackbar
      }

      // clear the form
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
      setErrors("") // clear errors
    } catch (err) {
      console.log("Failed to register the user: ", err)
      setErrors("Registration failed. Please try again.")
    }
  }

  // handle input change
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Close the snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  return (
    <Container maxWidth="sm">
      {errors && <Alert severity="error">{errors}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          name="username"
          margin="normal"
          value={formData.username}
          onChange={handleInputChange}
          required
          autoComplete="off"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          margin="normal"
          value={formData.email}
          onChange={handleInputChange}
          required
          autoComplete="off"
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
          autoComplete="off"
        />
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          margin="normal"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
          autoComplete="off"
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

      {/* Snackbar for success messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </Container>
  )
}

export default Register

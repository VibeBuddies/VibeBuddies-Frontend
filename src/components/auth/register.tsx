import React, { useState, ChangeEvent, FormEvent } from "react"
import { TextField, Button, Container, Alert } from "@mui/material"

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

//prop for a succesful registration
interface RegisterationProps {
  onRegistrationSuccess: () => void
}

const Register: React.FC<RegisterationProps> = ({ onRegistrationSuccess }) => {
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

    // basic password match validation and insurance that all fields have been filled
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

    /*for now this will always give access to feed
    so long as formData is filled out correctly.
    for the future the api will be called and if it
    is a valid user registration then a jwt token will be given */
    onRegistrationSuccess()

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
          name="username"
          margin="normal"
          value={formData.username}
          onChange={handleInputChange}
          required
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
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
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

import React, { useState, ChangeEvent, FormEvent, useContext } from "react"
import { TextField, Button, Container, Typography, Alert } from "@mui/material"
import { login as loginApi } from "../../api/loginApi" // Import the login API function
import { AuthContext } from "../Context/AuthContext"
import { useNavigate } from "react-router-dom"

/* Define the shape of the form data */
interface FormData {
  email: string
  password: string
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  })
  const [error, setError] = useState<string>("") // State for error messages
  const authContext = useContext(AuthContext) // Get the AuthContext
  const navigate = useNavigate()

  // Handle form submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (formData.email === "" || formData.password === "") {
      setError("Both email and password are required")
      return
    }

    if (authContext) {
      try {
        // Make API request to login and get the JWT token
        const response = await loginApi(formData.email, formData.password)
        const { token } = response // Assuming the API response contains the token

        // Store the token in context
        authContext.login(token)

        // Clear the form and error state
        setFormData({ email: "", password: "" })
        setError("")

        // Redirect to the feed page
        navigate("/feed")
      } catch (error) {
        setError("Invalid login credentials, please try again.")
      }
    } else {
      setError(
        "Auth context is unavailable. but you are reaching the correct message! When the api is hosted this should be resolved..."
      )
    }
  }

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <Container maxWidth="sm">
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
    </Container>
  )
}

export default Login

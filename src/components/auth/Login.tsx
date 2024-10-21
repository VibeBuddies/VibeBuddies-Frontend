import React, { useState, ChangeEvent, FormEvent, useContext } from "react"
import { TextField, Button, Container, Alert } from "@mui/material"
import { login as loginApi } from "../../api/loginApi"
import { AuthContext } from "../Context/AuthContext"
import { useNavigate } from "react-router-dom"

interface FormData {
  username: string
  password: string
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  })
  const [error, setError] = useState<string>("")

  // Get the login function from context
  const { login } = useContext(AuthContext)!
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (formData.username === "" || formData.password === "") {
      setError("Both username and password are required")
      return
    }

    try {
      const response = await loginApi(formData.username, formData.password)
      const token = response.data.token
      login(token, formData.username) // Save the token using the context login function
      navigate("/feed") // Redirect to the feed page after login
    } catch (err) {
      setError("Unable to log in. Please try again.")
    }
  }

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
          label="Username"
          name="username"
          margin="normal"
          value={formData.username}
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
        <Button variant="contained" color="primary" fullWidth type="submit">
          Login
        </Button>
      </form>
    </Container>
  )
}

export default Login

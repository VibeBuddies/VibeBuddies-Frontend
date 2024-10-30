import React, { ChangeEvent, FormEvent } from "react"
import { TextField, Button, Container, Alert } from "@mui/material"

/**
 *
 * Login TSX component for the LoginContainer
 *
 *  */

interface LoginProps {
  formData: {
    username: string
    password: string
  }
  error: string
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const Login: React.FC<LoginProps> = ({
  formData,
  error,
  onInputChange,
  onSubmit,
}) => (
  <Container maxWidth="sm">
    {error && <Alert severity="error">{error}</Alert>}
    <form onSubmit={onSubmit}>
      <TextField
        fullWidth
        label="Username"
        name="username"
        margin="normal"
        value={formData.username}
        onChange={onInputChange}
        required
      />
      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        margin="normal"
        value={formData.password}
        onChange={onInputChange}
        required
      />
      <Button variant="contained" color="primary" fullWidth type="submit">
        Login
      </Button>
    </form>
  </Container>
)

export default Login

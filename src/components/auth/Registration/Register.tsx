import React, { ChangeEvent, FormEvent } from "react"
import { TextField, Button, Container, Alert, Snackbar } from "@mui/material"

interface RegisterProps {
  formData: {
    username: string
    email: string
    password: string
    confirmPassword: string
  }
  errors: string
  snackbarOpen: boolean
  snackbarMessage: string
  onInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  onCloseSnackbar: () => void
}

const Register: React.FC<RegisterProps> = ({
  formData,
  errors,
  snackbarOpen,
  snackbarMessage,
  onInputChange,
  onSubmit,
  onCloseSnackbar,
}) => (
  <Container maxWidth="sm">
    {errors && <Alert severity="error">{errors}</Alert>}
    <form onSubmit={onSubmit}>
      {/* username input box */}
      <TextField
        fullWidth
        label="Username"
        name="username"
        margin="normal"
        value={formData.username}
        onChange={onInputChange}
        required
        autoComplete="off"
      />
      {/* email input box */}
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        margin="normal"
        value={formData.email}
        onChange={onInputChange}
        required
        autoComplete="off"
      />
      {/* password input box */}
      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        margin="normal"
        value={formData.password}
        onChange={onInputChange}
        required
        autoComplete="off"
      />
      {/* confirm password input box */}
      <TextField
        fullWidth
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        margin="normal"
        value={formData.confirmPassword}
        onChange={onInputChange}
        required
        autoComplete="off"
      />
      {/* submit button */}
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
      onClose={onCloseSnackbar}
      message={snackbarMessage}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    />
  </Container>
)

export default Register

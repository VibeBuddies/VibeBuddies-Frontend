import React, { useState, ChangeEvent, FormEvent } from "react"
import Register from "./Register"
import { register as registerApi } from "../../../api/registerApi"

/* registration component of the Access page
if the formData is filled out correctly this will
give access to the feed page in the future only if 
a user is registered succefully will they then be able to log in
and be given a jwt to then be granted into the rest of the app */

interface FormData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const RegisterContainer: React.FC = () => {
  //state for the form
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<string>("")
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //validating matching passwords
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
      //making the api call
      const response = await registerApi({
        username: formData.username,
        password: formData.password,
        email: formData.email,
      })

      if (response.data.status === "success") {
        setSnackbarMessage("Registration successful!")
        setSnackbarOpen(true)
      }

      //seting the state of the form data to clear the inputs
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
      setErrors("")
    } catch (err) {
      console.log("Failed to register the user: ", err)
      setErrors("Registration failed. Please try again.")
    }
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  return (
    <Register
      formData={formData}
      errors={errors}
      snackbarOpen={snackbarOpen}
      snackbarMessage={snackbarMessage}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
      onCloseSnackbar={handleCloseSnackbar}
    />
  )
}

export default RegisterContainer

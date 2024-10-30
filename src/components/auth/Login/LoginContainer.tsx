import React, { useState, ChangeEvent, FormEvent, useContext } from "react"
import { login as loginApi } from "../../../api/loginApi"
import { AuthContext } from "../../Context/AuthContext"
import { UserContext } from "../../Context/UserContext"
import { useNavigate } from "react-router-dom"
import Login from "./Login"

const LoginContainer: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState<string>("")

  // Get the login function from context
  const { login } = useContext(AuthContext)!
  const { setProperty } = useContext(UserContext)!
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
      login(token) // Save the token using the context login function
      setProperty("username", formData.username)
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
    <Login
      formData={formData}
      error={error}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
    />
  )
}

export default LoginContainer

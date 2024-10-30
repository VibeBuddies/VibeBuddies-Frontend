import React, { useState, ChangeEvent, FormEvent, useContext } from "react"
import { login as loginApi } from "../../../api/loginApi"
import { AuthContext } from "../../Context/AuthContext"
import { UserContext } from "../../Context/UserContext"
import { useNavigate } from "react-router-dom"
import Login from "./Login"

/**
 *
 * LogingContainer for login functionality which holds the Login tsx element
 *
 */

const LoginContainer: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState<string>("")

  //get the login function from context
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
      //save the token using the context login function
      login(token)
      setProperty("username", formData.username)
      //redirect to the feed page after login
      navigate("/global-feed")
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

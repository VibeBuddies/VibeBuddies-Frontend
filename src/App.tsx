import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom"
import Access from "./pages/Access"
import Feed from "./pages/feed"
import Profile from "./pages/Profile"
import Navbar from "./components/navbar/NavBar"
import { AuthProvider } from "./components/Context/AuthContext"

const App: React.FC = () => {
  const location = useLocation()

  // Show the navbar on all pages except for the Access page
  const showNavbar = location.pathname !== "/"

  return (
    <>
      {/* Conditionally render the Navbar */}
      {showNavbar && <Navbar />}

      <Routes>
        {/* Access/Login/Register page */}
        <Route path="/" element={<Access />} />

        {/* Authenticated Routes */}
        <Route
          path="/"
          element={
            <AuthProvider>
              <>
                <Route path="/feed" element={<Feed />} />
                <Route path="/profile" element={<Profile />} />
              </>
            </AuthProvider>
          }
        />
      </Routes>
    </>
  )
}

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
)

export default WrappedApp

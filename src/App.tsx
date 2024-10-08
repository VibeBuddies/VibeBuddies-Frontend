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
import Settings from "./pages/Settings"
import Navbar from "./components/navbar/NavBar"

const App: React.FC = () => {
  const location = useLocation()

  // Show the navbar on all pages except for the Access page
  const showNavbar = location.pathname !== "/"

  return (
    <>
      {/* Conditionally render the Navbar */}
      {showNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Access />} />{" "}
        {/* Access/Login/Register page */}
        <Route path="/feed" element={<Feed />} /> {/* Feed page */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} /> {/* Profile page */}
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

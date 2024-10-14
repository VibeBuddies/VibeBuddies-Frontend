import React, { useContext } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom"
import Access from "./pages/Access"
import Feed from "./pages/feed"
import Profile from "./pages/Profile"
import Navbar from "./components/navbar/NavBar"
import { AuthProvider, AuthContext } from "./components/Context/AuthContext"

// ProtectedRoute component to protect routes based on authentication
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useContext(AuthContext)!

  return isAuthenticated ? children : <Navigate to="/" />
}

const App: React.FC = () => {
  const location = useLocation()

  // Show the navbar on all pages except for the Access page
  const showNavbar = location.pathname !== "/"

  /* COMMENT OUT THE PROTECTED ROUTE TAGS IF
   YOU WANT TO SEE THOSE PAGES WITHOUT LOGGING IN
   AND BEING AUTHENTICATED*/

  return (
    <>
      {/* Conditionally render the Navbar */}
      {showNavbar && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Access />} /> {/* Home/Login/Register Page */}
        {/* Authenticated Routes */}
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

const WrappedApp = () => (
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
)

export default WrappedApp

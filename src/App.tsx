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
import GlobalFeed from "./pages/globalFeed"
import Profile from "./pages/Profile"
import Navbar from "./components/navbar/NavBar"
import { AuthProvider, AuthContext } from "./components/Context/AuthContext"
import { UserProvider } from "./components/Context/UserContext"

//protectedRoute component to protect routes based on authentication
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useContext(AuthContext)!

  return isAuthenticated ? children : <Navigate to="/" />
}

const App: React.FC = () => {
  const location = useLocation()

  //shows the navbar on all pages except for the Access page
  const showNavbar = location.pathname !== "/"

  return (
    <>
      {/* Conditionally render the Navbar */}
      {showNavbar && <Navbar />}

      <Routes>
        {/* public */}
        <Route path="/" element={<Access />} /> {/* Home/Login/Register Page */}
        {/* authenticated */}
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/global-feed"
          element={
            <ProtectedRoute>
              <GlobalFeed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:username"
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
    <UserProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </UserProvider>
  </Router>
)

export default WrappedApp

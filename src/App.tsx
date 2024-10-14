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

  /* BELOW IS THE VERSION THAT INCORPORATES AUTH 
    YOU WILL NEED TO COMMENT OUT THIS RETURN 
    STATEMENT TO IGNORE AUTH AND FREELY VIEW 
    PAGES PAST ACCESS WITHOUT LOGGIN IN, 
    YOU WILL ALSO NEED TO 
    COMMENT OUT THE VERSION OF 'WRAPPEDAPP' WHICH
    HAS THE </AUTHPROVIDER> TAGS */

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

  /* THIS VERSION IGNORES AUTH AND FREELY ALLOWS
  WORK ON PAGES*/

  // return (
  //   <>
  //     {showNavbar && <Navbar />}

  //     <Routes>
  //       <Route path="/" element={<Access />} />
  //       <Route path="/feed" element={<Feed />} /> {/* Feed Page */}
  //       <Route path="/profile" element={<Profile />} /> {/* Profile Page */}
  //     </Routes>
  //   </>
  // )
}

/* THIS VERSION OF WRAPPED APP IGNORES AUTH AND FREELY ALLOWS
  WORK ON PAGES*/

// const WrappedApp = () => (
//   <Router>
//     <App />
//   </Router>
// )

// export default WrappedApp

/* THIS VERSION INCORPORATES AUTH AND REQUIRES LOG IN
TO VIEW PAGES PAST THE ACCESS PAGE*/

const WrappedApp = () => (
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
)

export default WrappedApp

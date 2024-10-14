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

  /* BELOW IS THE VERSION THAT INCORPORATES AUTH 
    WE WILL NEED CONNECTION TO THE API TO USE 
    THIS BUT IN THE MEANTIME THIS WILL NOT LET US WORK
    ON PAGES OR ANYTHING PAST LOG IN */

  // return (
  //   <>
  //     {/* Conditionally render the Navbar */}
  //     {/* {showNavbar && <Navbar />} */}

  //     <Routes>
  //       {/* Access/Login/Register page */}
  //       <Route path="/" element={<Access />} />

  //       {/* Authenticated Routes */}
  //       <Route
  //         path="/"
  //         element={
  //           <AuthProvider>
  //             <>
  //               {/* Conditionally render the Navbar */}
  //               {showNavbar && <Navbar />}
  //               <Route path="/feed" element={<Feed />} />
  //               <Route path="/profile" element={<Profile />} />
  //             </>
  //           </AuthProvider>
  //         }
  //       />
  //     </Routes>
  //   </>
  // )

  /* THIS VERSION IGNORES AUTH AND FREELY ALLOWS
  WORK ON PAGES*/

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Access />} /> {/* Home/Login/Register Page */}
        <Route path="/feed" element={<Feed />} /> {/* Feed Page */}
        <Route path="/profile" element={<Profile />} /> {/* Profile Page */}
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

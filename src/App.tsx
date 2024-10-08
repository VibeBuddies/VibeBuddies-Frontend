import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Access from "./pages/Access" // Ensure the correct path for Access
import Feed from "./pages/feed" // Ensure the correct path for Feed
import Profile from "./pages/Profile"

/* Router controls the flow between pages 
users start off at Access page and if they 
successfully log in a JWT wil allow them to 
access the rest of the sight (future implementation)  */

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Access />} /> {/* Home/Login/Register Page */}
        <Route path="/feed" element={<Feed />} /> {/* Feed Page */}
        <Route path="/profile" element={<Profile />} /> {/* Profile Page */}
      </Routes>
    </Router>
  )
}

export default App

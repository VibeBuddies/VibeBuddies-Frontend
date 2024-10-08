import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Access from "./pages/Access" // Ensure the correct path for Access
import Feed from "./pages/feed" // Ensure the correct path for Feed

/* Router controls the flow between pages 
users start off at Access page and if they 
successfully log in a JWT wil allow them to 
access the rest of the sight (future implementation)  */

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* login/registration "Access" page */}
        <Route path="/" element={<Access />} />

        {/* feed page */}
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </Router>
  )
}

export default App

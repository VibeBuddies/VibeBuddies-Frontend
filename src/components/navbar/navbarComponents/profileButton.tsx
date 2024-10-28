import React, { useContext, useState, useEffect } from "react"
import { IconButton, Tooltip } from "@mui/material"
import PersonIcon from "@mui/icons-material/Person"
import { useNavigate } from "react-router-dom" // Import useNavigate
import { UserContext } from "../../Context/UserContext"
import getUserByUsername from "../../../api/getUserbyUsernameApi"

/* profile button on the navbar which will navigate 
the user to their profile */

const ProfileButton: React.FC = () => {
  const { username } = useContext(UserContext)!
  const navigate = useNavigate()
  // const username = 'luistest';

  // Navigate to the profile page on button click
  const handleProfileClick = () => {
    navigate(`/profile/${username}`)
  }

  const [profilePic, setProfileImage] = useState<string>("")

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        // api function call
        const data = await getUserByUsername(username!)

        if (data?.data?.user?.profileImageUrl) {
          setProfileImage(data.data.user.profileImageUrl)
        }
      } catch (error) {
        console.log(
          `There was an error while retrieving personal info: ${error}`
        )
      }
    }
    fetchProfilePic()
  }, [username])

  return (
    <Tooltip title="Go to Profile" arrow placement="bottom">
      <IconButton
        onClick={handleProfileClick}
        sx={{
          color: "grey",
          width: "100px",
          height: "100px",
        }}
      >
        {/* <PersonIcon sx={{ fontSize: 60 }} /> */}
        {profilePic ? (
          <img
            src={profilePic}
            alt={username}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
            }}
          />
        ) : (
          <PersonIcon sx={{ fontSize: 60 }} />
        )}
      </IconButton>
    </Tooltip>
  )
}

export default ProfileButton

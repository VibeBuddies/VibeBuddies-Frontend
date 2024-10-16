import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

/* profile button on the navbar which will navigate 
the user to their profile */

const username = 'Milford.Keeling';

const ProfileButton: React.FC = () => {
  const navigate = useNavigate();

  // Navigate to the profile page on button click
  const handleProfileClick = () => {
    navigate(`/profile/${username}`);
  };

  return (
    <Tooltip title="Go to Profile" arrow placement="bottom">
      <IconButton
        onClick={handleProfileClick}
        sx={{
          color: 'grey',
          width: '100px',
          height: '100px',
        }}
      >
        <PersonIcon sx={{ fontSize: 60 }} />
      </IconButton>
    </Tooltip>
  );
};

export default ProfileButton;

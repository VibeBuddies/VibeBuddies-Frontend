import React, { useState, useEffect } from 'react';

import {
  Avatar,
  Typography,
  IconButton,
  TextField,
  Button,
  Box,
  Grid,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import updatePersonalProfile from '../../api/updateProfile';

interface UserProfileProps {
  userInfo: {
    username: string;
    favoriteSong?: string;
    favoriteArtist?: string;
    favoriteAlbum?: string;
    city?: string;
    state?: string;
    country?: string;
    bio?: string;
  };
  setUserInfo: any;
  profileImage: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  userInfo,
  setUserInfo,
  profileImage = '',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localUserInfo, setLocalUserInfo] = useState(userInfo);

  // block to check when userInfo changes
  useEffect(() => {
    setLocalUserInfo(userInfo);
  }, [userInfo]);

  // function to change the the clicking of the editting button
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // function to handle the changing of profile fields
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name, value);
    setLocalUserInfo({ ...localUserInfo, [name]: value });
  };

  // function to handle the saving of information
  const handleSave = async () => {
    setIsEditing(true);

    try {
      await updatePersonalProfile(localUserInfo);
      setUserInfo(localUserInfo);
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setIsEditing(false);
    }
  };

  // function to handle the canceling of editting profile
  const handleCancel = () => {
    setLocalUserInfo({
      ...userInfo,
    });
    setIsEditing(false);
  };
  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      {/* profile image and userInfo.username */}
      <Avatar
        alt={userInfo.username}
        src={profileImage}
        sx={{ width: 100, height: 100, margin: 'auto' }}
      ></Avatar>
      <Typography variant="h4">{userInfo.username}</Typography>
      {/* settings button */}
      {!isEditing && (
        <IconButton onClick={handleEditToggle} aria-label="settings">
          <SettingsIcon />
        </IconButton>
      )}
      {/* profile details conditionally shown */}
      {!isEditing ? (
        <Box sx={{ mt: 2 }}>
          {localUserInfo.favoriteSong && (
            <Typography>Favorite Song: {localUserInfo.favoriteSong}</Typography>
          )}
          {localUserInfo.favoriteArtist && (
            <Typography>
              Favorite Artist: {localUserInfo.favoriteArtist}
            </Typography>
          )}
          {localUserInfo.favoriteAlbum && (
            <Typography>
              Favorite Album: {localUserInfo.favoriteAlbum}
            </Typography>
          )}
          {localUserInfo.city &&
            localUserInfo.state &&
            localUserInfo.country && (
              <Typography>
                Location: {localUserInfo.city}, {localUserInfo.state},{' '}
                {localUserInfo.country}
              </Typography>
            )}
          {localUserInfo.bio && (
            <Typography>Biography: {localUserInfo.bio}</Typography>
          )}
        </Box>
      ) : (
        <Box sx={{ mt: 2 }}>
          {/* setting the editable field  */}
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <TextField
                label="Favorite Song"
                name="favoriteSong"
                value={localUserInfo.favoriteSong}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Favorite Artist"
                name="favoriteArtist"
                value={localUserInfo.favoriteArtist}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Favorite Album"
                name="favoriteAlbum"
                value={localUserInfo.favoriteAlbum}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="City"
                name="city"
                value={localUserInfo.city}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="State"
                name="state"
                value={localUserInfo.state}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Country"
                name="country"
                value={localUserInfo.country}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Bio"
                name="bio"
                value={localUserInfo.bio}
                onChange={handleInputChange}
                multiline
                rows={3}
              />
            </Grid>
          </Grid>

          {/* save and cancel button */}
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button
              sx={{ ml: 2 }}
              variant="outlined"
              color="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UserProfile;

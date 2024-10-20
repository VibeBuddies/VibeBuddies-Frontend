import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../Context/UserContext';

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

// interface for the props we expect
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
  // getting the logged in username from the context
  const {
    username: loggedInUser,
    isEditing,
    setProperty,
  } = useContext(UserContext)!;

  // state to keep track if user is editting their information
  // const [isEditing, setProperty] = useState(false);
  // state to keep track of the user information lcoally
  const [localUserInfo, setLocalUserInfo] = useState(userInfo);

  // block to check when userInfo changes, only happens if the save button is clicked
  useEffect(() => {
    setLocalUserInfo(userInfo);
  }, [userInfo]);

  // function to toggle the editting option
  const handleEdit = () => {
    setProperty('isEditing', true);
  };

  // function to handle the changing of profile fields
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name, value);
    setLocalUserInfo({ ...localUserInfo, [name]: value });
  };

  // function to handle the saving of information
  const handleSave = async () => {
    setProperty('isEditing', true);

    // block makes a call to the axios function that calls the api to update user information
    try {
      await updatePersonalProfile(localUserInfo);
      setUserInfo(localUserInfo);
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setProperty('isEditing', false);
    }
  };

  // function to handle the canceling of editting profile
  const handleCancel = () => {
    setLocalUserInfo({
      ...userInfo,
    });
    setProperty('isEditing', false);
  };
  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      {/* profile image and username */}
      <Avatar
        alt={userInfo.username}
        src={profileImage}
        sx={{ width: 100, height: 100, margin: 'auto' }}
      ></Avatar>
      {/* username */}
      <Typography variant="h4">{userInfo.username}</Typography>
      {/* settings button, only present when not in editting form */}
      {loggedInUser === userInfo.username && !isEditing && (
        <IconButton onClick={handleEdit} aria-label="settings">
          <SettingsIcon />
        </IconButton>
      )}
      {/* profile details conditionally shown, only when editting and the information is present in the state  */}
      {!isEditing ? (
        <Box sx={{ mt: 2 }}>
          {/* favorite song */}
          {localUserInfo.favoriteSong && (
            <Typography>Favorite Song: {localUserInfo.favoriteSong}</Typography>
          )}
          {/* favorite artist */}
          {localUserInfo.favoriteArtist && (
            <Typography>
              Favorite Artist: {localUserInfo.favoriteArtist}
            </Typography>
          )}
          {/* favorite album */}
          {localUserInfo.favoriteAlbum && (
            <Typography>
              Favorite Album: {localUserInfo.favoriteAlbum}
            </Typography>
          )}
          {/* city, state and country */}
          {localUserInfo.city &&
            localUserInfo.state &&
            localUserInfo.country && (
              <Typography>
                Location: {localUserInfo.city}, {localUserInfo.state},{' '}
                {localUserInfo.country}
              </Typography>
            )}
          {/* user bio */}
          {localUserInfo.bio && (
            <Typography>Bio: {localUserInfo.bio}</Typography>
          )}
        </Box>
      ) : (
        loggedInUser === userInfo.username && (
          // block for user to edit the fields
          <Box sx={{ mt: 2 }}>
            {/* grid to hold the fields that are editable */}
            <Grid container spacing={1}>
              {/* favorite song */}
              <Grid item xs={3}>
                <TextField
                  label="Favorite Song"
                  name="favoriteSong"
                  value={localUserInfo.favoriteSong}
                  onChange={handleInputChange}
                />
              </Grid>
              {/* favorite artist */}
              <Grid item xs={3}>
                <TextField
                  label="Favorite Artist"
                  name="favoriteArtist"
                  value={localUserInfo.favoriteArtist}
                  onChange={handleInputChange}
                />
              </Grid>
              {/* favorite album */}
              <Grid item xs={3}>
                <TextField
                  label="Favorite Album"
                  name="favoriteAlbum"
                  value={localUserInfo.favoriteAlbum}
                  onChange={handleInputChange}
                />
              </Grid>
              {/* user city */}
              <Grid item xs={3}>
                <TextField
                  label="City"
                  name="city"
                  value={localUserInfo.city}
                  onChange={handleInputChange}
                />
              </Grid>
              {/* user state */}
              <Grid item xs={3}>
                <TextField
                  label="State"
                  name="state"
                  value={localUserInfo.state}
                  onChange={handleInputChange}
                />
              </Grid>
              {/* user country */}
              <Grid item xs={3}>
                <TextField
                  label="Country"
                  name="country"
                  value={localUserInfo.country}
                  onChange={handleInputChange}
                />
              </Grid>
              {/* user bio */}
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

            {/* save and cancel button, only present when editting*/}
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
        )
      )}
    </Box>
  );
};

export default UserProfile;

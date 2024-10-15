import React, { useState } from 'react';

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
import { useNavigate } from 'react-router-dom';

interface UserProfileProps {
  username: string;
  profileImage: string;
  favoriteSong?: string;
  favoriteArtist?: string;
  favoriteAlbum?: string;
  city?: string;
  state?: string;
  country?: string;
  bio?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  username,
  profileImage,
  favoriteSong = '',
  favoriteArtist = '',
  favoriteAlbum = '',
  city = '',
  state = '',
  country = '',
  bio = '',
}) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    favoriteSong,
    favoriteArtist,
    favoriteAlbum,
    city,
    state,
    country,
    bio,
  });

  // function to change the the clicking of the editting button
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // function to handle the changing of profile fields
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  // function to handle the saving of information
  const handleSave = async () => {
    setIsEditing(true);

    try {
      await updatePersonalProfile(editedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setIsEditing(false);
      navigate('/profile');
    }
  };

  // function to handle the canceling of editting profile
  const handleCancel = () => {
    setEditedProfile({
      favoriteSong,
      favoriteArtist,
      favoriteAlbum,
      city,
      state,
      country,
      bio,
    });
    setIsEditing(false);
  };
  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      {/* profile image and username */}
      <Avatar
        alt={username}
        src={'forNowAString'}
        sx={{ width: 100, height: 100, margin: 'auto' }}
      ></Avatar>
      <Typography variant="h4">{username}</Typography>
      {/* settings button */}
      {!isEditing && (
        <IconButton onClick={handleEditToggle} aria-label="settings">
          <SettingsIcon />
        </IconButton>
      )}
      {/* profile details conditionally shown */}
      {!isEditing ? (
        <Box sx={{ mt: 2 }}>
          {favoriteSong && (
            <Typography>Favorite Song: {favoriteSong}</Typography>
          )}
          {favoriteArtist && (
            <Typography>Favorite Artist: {favoriteArtist}</Typography>
          )}
          {favoriteAlbum && (
            <Typography>Favorite Album: {favoriteAlbum}</Typography>
          )}
          {city && state && country && (
            <Typography>
              Location: {city}, {state}, {country}
            </Typography>
          )}
          {bio && <Typography>Biography: {bio}</Typography>}
        </Box>
      ) : (
        <Box sx={{ mt: 2 }}>
          {/* setting the editable field  */}
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <TextField
                label="Favorite Song"
                name="favoriteSong"
                value={editedProfile.favoriteSong}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Favorite Artist"
                name="favoriteArtist"
                value={editedProfile.favoriteArtist}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Favorite Album"
                name="favoriteAlbum"
                value={editedProfile.favoriteAlbum}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="City"
                name="city"
                value={editedProfile.city}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="State"
                name="state"
                value={editedProfile.state}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Country"
                name="country"
                value={editedProfile.country}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Bio"
                name="bio"
                value={editedProfile.bio}
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

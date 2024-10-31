import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../Context/UserContext';

import {
  Avatar,
  Typography,
  IconButton,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import updatePersonalProfile from '../../api/updateProfile';
import sendFriendRequest from '../../api/sendFriendRequest';
import deleteFriend from '../../api/deleteFriend';
import BoxInformation from './BoxInformation';
import BoxUpdate from './BoxUpdate';
import InfoIcon from '@mui/icons-material/Info';
import updateProfileImage from '../../api/updateProfileImage';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

// interface for the component prop params
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
    profileImageUrl?: string;
  };
  setUserInfo: any;
}

// functional component with user information
const UserProfile: React.FC<UserProfileProps> = ({ userInfo, setUserInfo }) => {
  /**
   * functional component that displays the users information at the top of the page
   */

  // getting information and functions for UserContext
  const {
    username: loggedInUser,
    isEditing,
    setProperty,
    friendList,
  } = useContext(UserContext)!;

  // state to keep track of local user information based on the user who was passed through
  const [localUserInfo, setLocalUserInfo] = useState(userInfo);
  // state for the profileImage of the user
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  // state for snack bar from mui
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // variable to check if the user is a friend of the user who is currently logged in
  let isFriend = friendList?.has(localUserInfo.username);

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

  // function to handle the saving/updating of user information
  const handleSave = async () => {
    try {
      if (profileImageFile) {
        await updateProfileImage(profileImageFile);
      }
      await updatePersonalProfile(localUserInfo);
      setUserInfo(localUserInfo);
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setProperty('isEditing', false);
    }
  };

  // function to handle the canceling of editting profile, returns to previous state and closes editing form
  const handleCancel = () => {
    setLocalUserInfo({
      ...userInfo,
    });
    setProperty('isEditing', false);
  };

  // block handles sending a friend request
  async function handleAddFriend(username: string | undefined): Promise<void> {
    await sendFriendRequest(username!);
    setSnackbarMessage(`Friend request sent to ${username}`);
    setSnackbarOpen(true);
  }

  // block handles deleting a friend, updates context friendlist to show removal friend in real time
  async function handleRemoveFriend(
    username: string | undefined
  ): Promise<void> {
    await deleteFriend(username!);
    setProperty(
      `friendList`,
      new Set([...friendList!].filter((friend) => friend !== username))
    );
    setSnackbarMessage(`Friend removed: ${username}`);
    setSnackbarOpen(true);
  }

  // handling the closing of the snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // function to hamdle the changing of image
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      // set the state
      setProfileImageFile(event.target.files[0]);
      // setting the image for the local profile
      setLocalUserInfo({
        ...localUserInfo,
        profileImageUrl: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  // JSX
  return (
    // overall container
    <Box sx={{ mt: 4, marginLeft: 2 }}>
      {/* container to hold the user's profile image, attributes (not bio) and edit/friend button */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        {/* container for the profile image */}
        <Box
          sx={{ position: 'relative', width: 220, height: 250, marginRight: 2 }}
        >
          {/* mui container for the profile immage */}
          <Avatar
            alt={userInfo.username}
            src={
              localUserInfo.profileImageUrl ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9p_svIjwA810BURgFBTU0V6fNjiU9MRbUXQ&s'
            }
            sx={{
              width: '100%',
              height: '100%',
              cursor: isEditing ? 'pointer' : 'default',
            }}
            onClick={() =>
              isEditing && document.getElementById('imageInput')?.click()
            }
          />
          {/* if editing, add overlay on pfp to be able to change */}
          {isEditing && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
                textAlign: 'center',
                cursor: 'pointer',
                borderRadius: '50%',
              }}
              onClick={() => document.getElementById('imageInput')?.click()}
            >
              Click to Change
            </Box>
          )}
          {/* if editting, handdle the input of the image */}
          {isEditing && (
            <input
              type="file"
              id="imageInput"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleImageChange}
            />
          )}
        </Box>

        {/* container to handle attributes (not bio) and buttons */}
        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* mui component for username */}
            <Typography variant="h4">{userInfo.username}</Typography>

            {/* mui component to conditionally render edit (save,cancel)/add/remove friend buttons */}
            <Box>
              {/* if editing display save/cancel button */}
              {isEditing ? (
                <>
                  {/* save button */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  {/* cancel button */}
                  <Button
                    sx={{ ml: 2 }}
                    variant="contained"
                    color="error"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                // if not edditing and current profile is the profile page of the logged in user display an editting icon
                <>
                  {loggedInUser === userInfo.username && (
                    <IconButton onClick={handleEdit} aria-label="settings">
                      <SettingsIcon />
                    </IconButton>
                  )}

                  {/* if not editting, but the profile is not the profile of the logged in user, display add/remove friend */}
                  {loggedInUser !== userInfo.username && (
                    <Button
                      variant="contained"
                      // if friend primary, if not then error
                      color={isFriend ? 'error' : 'primary'}
                      // if friend, remove friend text, if not then add friend text
                      onClick={() =>
                        isFriend
                          ? handleRemoveFriend(userInfo.username)
                          : handleAddFriend(userInfo.username)
                      }
                      // icon displayed based on if friend or not
                      startIcon={
                        isFriend ? <PersonRemoveIcon /> : <PersonAddIcon />
                      }
                    >
                      {/* text depending of is user if a friend or not */}
                      {isFriend ? 'Remove Friend' : 'Add Friend'}
                    </Button>
                  )}
                </>
              )}
            </Box>
          </Box>

          {/* container to display information of user and show editting inputs */}
          <Box sx={{ mt: 2 }}>
            {/* if editting show updatable inputs */}
            {isEditing ? (
              <>
                <BoxUpdate
                  name={'favoriteArtist'}
                  property={localUserInfo.favoriteArtist}
                  handleChange={handleInputChange}
                />
                <BoxUpdate
                  name={'favoriteAlbum'}
                  property={localUserInfo.favoriteAlbum}
                  handleChange={handleInputChange}
                  sx={{ mt: 1.5 }}
                />
                <BoxUpdate
                  name={'favoriteSong'}
                  property={localUserInfo.favoriteSong}
                  handleChange={handleInputChange}
                  sx={{ mt: 1.5 }}
                />
              </>
            ) : (
              // if not editing, then show information
              <>
                <BoxInformation
                  property={localUserInfo.favoriteArtist}
                  phrase={'Favorite Artist'}
                />
                <BoxInformation
                  property={localUserInfo.favoriteAlbum}
                  phrase={'Favorite Album'}
                />
                <BoxInformation
                  property={localUserInfo.favoriteSong}
                  phrase={'Favorite Song'}
                />
              </>
            )}
          </Box>
        </Box>
      </Box>

      {/* container for user bio */}
      <Box sx={{ mt: 2, width: '100%' }}>
        {/* conditionally render if bio is not empty */}
        {localUserInfo.bio && (
          // container for icon and bio title
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <InfoIcon sx={{ mr: 1, alignSelf: 'center' }} />
            <Typography variant="body1" sx={{ mb: 0 }} color="textSecondary">
              Bio
            </Typography>
          </Box>
        )}

        {/* if editting show updatable input */}
        {isEditing ? (
          <TextField
            label="Bio"
            name="bio"
            value={localUserInfo.bio}
            onChange={handleInputChange}
            multiline
            rows={3}
            fullWidth
          />
        ) : (
          // if not editing show user bio
          <Typography variant="body1" sx={{ maxWidth: '100%' }}>
            {localUserInfo.bio}
          </Typography>
        )}
      </Box>

      {/* snackbar for when user is added/removed */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserProfile;

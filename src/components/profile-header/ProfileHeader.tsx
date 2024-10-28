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

  // console.log(userInfo);

  // state to keep track of local user information based on the user who was passed through
  const [localUserInfo, setLocalUserInfo] = useState(userInfo);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImageFile(event.target.files[0]);
      setLocalUserInfo({
        ...localUserInfo,
        profileImageUrl: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  // JSX
  return (
    <Box sx={{ mt: 4, marginLeft: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <Box
          sx={{ position: 'relative', width: 220, height: 250, marginRight: 2 }}
        >
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

        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4">{userInfo.username}</Typography>
            <Box>
              {isEditing ? (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
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
                <>
                  {loggedInUser === userInfo.username && (
                    <IconButton onClick={handleEdit} aria-label="settings">
                      <SettingsIcon />
                    </IconButton>
                  )}
                  {loggedInUser !== userInfo.username && (
                    <Button
                      variant="contained"
                      color={isFriend ? 'error' : 'primary'}
                      onClick={() =>
                        isFriend
                          ? handleRemoveFriend(userInfo.username)
                          : handleAddFriend(userInfo.username)
                      }
                      startIcon={
                        isFriend ? <PersonRemoveIcon /> : <PersonAddIcon />
                      }
                    >
                      {isFriend ? 'Remove Friend' : 'Add Friend'}
                    </Button>
                  )}
                </>
              )}
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
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

      <Box sx={{ mt: 2, width: '100%' }}>
        {localUserInfo.bio && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <InfoIcon sx={{ mr: 1, alignSelf: 'center' }} />
            <Typography variant="body1" sx={{ mb: 0 }} color="textSecondary">
              Bio
            </Typography>
          </Box>
        )}

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
          <Typography variant="body1" sx={{ maxWidth: '100%' }}>
            {localUserInfo.bio}
          </Typography>
        )}
      </Box>

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

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
import sendFriendRequest from '../../api/sendFriendRequest';
import deleteFriend from '../../api/deleteFriend';
import BoxInformation from './BoxInformation';
import BoxUpdate from './BoxUpdate';
import InfoIcon from '@mui/icons-material/Info';

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
  };
  setUserInfo: any;
  profileImage: string;
}

// functional component with user information
const UserProfile: React.FC<UserProfileProps> = ({
  userInfo,
  setUserInfo,
  profileImage = '',
}) => {
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
    // api function call to update informaiton, set information to show in real time
    try {
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
  }

  // JSX
  return (
    <Box sx={{ mt: 4, marginLeft: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <Avatar
          alt={userInfo.username}
          src={profileImage}
          sx={{
            width: 220,
            height: 250,
            marginRight: 2,
          }}
        />
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
              {loggedInUser === userInfo.username && !isEditing && (
                <IconButton onClick={handleEdit} aria-label="settings">
                  <SettingsIcon />
                </IconButton>
              )}
              {loggedInUser !== userInfo.username && !isEditing && (
                <Button
                  variant="contained"
                  color={isFriend ? 'secondary' : 'primary'}
                  onClick={() =>
                    isFriend
                      ? handleRemoveFriend(userInfo.username)
                      : handleAddFriend(userInfo.username)
                  }
                >
                  {isFriend ? 'Remove Friend' : 'Add Friend'}
                </Button>
              )}
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
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
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 1, width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <InfoIcon sx={{ mr: 0, alignSelf: 'center' }} />
          <Typography variant="h6" sx={{ mb: 0 }} color="textSecondary">
            Bio
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ maxWidth: '100%' }}>
          {localUserInfo.bio}
        </Typography>
      </Box>

      {isEditing && (
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={1}>
            <BoxUpdate
              name={'favoriteSong'}
              property={localUserInfo.favoriteSong}
              handleChange={handleInputChange}
            />
            <BoxUpdate
              name={'favoriteArtist'}
              property={localUserInfo.favoriteArtist}
              handleChange={handleInputChange}
            />
            <BoxUpdate
              name={'favoriteAlbum'}
              property={localUserInfo.favoriteAlbum}
              handleChange={handleInputChange}
            />
            <BoxUpdate
              name={'city'}
              property={localUserInfo.city}
              handleChange={handleInputChange}
            />
            <BoxUpdate
              name={'state'}
              property={localUserInfo.state}
              handleChange={handleInputChange}
            />
            <BoxUpdate
              name={'country'}
              property={localUserInfo.country}
              handleChange={handleInputChange}
            />
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

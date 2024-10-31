import React, { useEffect, useState } from 'react';
import UserProfile from '../components/profile-header/ProfileHeader';
import getPersonalInformation from '../api/getPersonalnfo';
import { Box, Grid } from '@mui/material';
import FriendList from '../components/friends/FriendList';
import { useParams } from 'react-router-dom';
import VibeCheckList from '../components/userVibeChecks/vibeCheckList';

// interface for the user data
interface UserProfileData {
  username: string;
  profileImage?: string;
  favoriteSong?: string;
  favoriteArtist?: string;
  favoriteAlbum?: string;
  city?: string;
  state?: string;
  country?: string;
  bio?: string;
  profileImageUrl?: string;
}

const Profile: React.FC = () => {
  /**
   * functional component to display the profile of the user, displayed profileHeader, FriendList and vibeCheckList
   */

  // state to store user info, initially will be empty
  const [userInfo, setUserInfo] = useState<UserProfileData | null>(null);

  // getting the route params, should get the username passed through
  const params = useParams();
  const usernameSearch = params.username || '';

  // block fetches the user information and stores it in the state, based on the username in the route param
  useEffect(() => {
    const fetchPersonalInformation = async () => {
      try {
        const data = await getPersonalInformation(usernameSearch);
        // block checks if data contains information about the user sets the state
        if (data?.data?.data?.user) {
          const {
            username,
            favoriteSong,
            favoriteArtist,
            favoriteAlbum,
            city,
            state,
            country,
            bio,
            profileImageUrl,
          } = data.data.data.user;
          setUserInfo({
            username,
            favoriteSong,
            favoriteArtist,
            favoriteAlbum,
            city,
            state,
            country,
            bio,
            profileImageUrl,
          });
        }
      } catch (error) {
        console.log(
          `There was an error while retrieving personal info: ${error}`
        );
      }
    };

    fetchPersonalInformation();
  }, [usernameSearch]);

  // JSX
  return (
    <>
      {/* grid for the overall page */}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {/* grid for userprofile and the vibechecks */}
        <Grid item xs={12} md={8}>
          {/* grid for userprofile */}
          <Box sx={{ marginBottom: 2 }}>
            {/* user info/profile rendered conditionally*/}
            {userInfo && (
              <UserProfile userInfo={userInfo} setUserInfo={setUserInfo} />
            )}
          </Box>

          {/* vibechecks component  */}
          <Box sx={{ marginLeft: 2 }}>
            <h2>VibeChecks</h2>
            <VibeCheckList usernameProp={usernameSearch} />
          </Box>
        </Grid>

        {/* grid for FriendList */}
        <Grid item xs={12} md={4}>
          {/* box for FriendList component*/}
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
          >
            <h2>Friends</h2>
            <FriendList usernameProp={usernameSearch} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;

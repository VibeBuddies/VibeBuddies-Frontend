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
}

const Profile: React.FC = () => {
  /**
   * functional component to display the profile of the user
   */

  // state to store user info, initially will be empty
  const [userInfo, setUserInfo] = useState<UserProfileData | null>(null);
  // state to keep track of which tab is open
  const [activeTab, setActiveTab] = useState<string>('vibechecks');

  // getting the route params
  const params = useParams();
  const usernameSearch = params.username || '';

  // block fetches the user information and stores it in the state
  useEffect(() => {
    const fetchPersonalInformation = async () => {
      try {
        const data = await getPersonalInformation(usernameSearch);
        // block checks if data contains information about the user
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
          <Box sx={{ marginBottom: 2 }}>
            {/* user info/profile */}
            {userInfo && (
              <UserProfile
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                profileImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9p_svIjwA810BURgFBTU0V6fNjiU9MRbUXQ&s"
              />
            )}
          </Box>

          {/* vibechecks */}
          <Box>
            <h2>VibeChecks</h2>
            <VibeCheckList usernameProp={usernameSearch} />
          </Box>
        </Grid>

        {/* grid for friends */}
        <Grid item xs={12} md={4}>
          {/* box for friends */}
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

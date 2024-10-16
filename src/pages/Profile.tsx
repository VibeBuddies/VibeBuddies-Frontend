import React, { useEffect, useState } from 'react';
import UserProfile from '../components/profile-header/ProfileHeader';
import getPersonalInformation from '../api/getPersonalnfo';
import { Tabs, Tab, Box } from '@mui/material';
import FriendList from '../components/friends/FriendList';

/* arranges the Profile componenets into an profile page 
which is accessible through a button on the feed page*/

const username = 'Nicholas';

// interface for the user data
interface UserProfileData {
  username: string;
  favoriteSong?: string;
  favoriteArtist?: string;
  favoriteAlbum?: string;
  city?: string;
  state?: string;
  country?: string;
  bio?: string;
}

// functional component for the profile page
const Profile: React.FC = () => {
  // state to store user info, initially will be empty
  const [userInfo, setUserInfo] = useState<UserProfileData | null>(null);
  // state to keep track of which tab is open
  const [activeTab, setActiveTab] = useState<string>('vibechecks');

  // block fetches the user information and stores it in the state
  useEffect(() => {
    const fetchPersonalInformation = async () => {
      try {
        const data = await getPersonalInformation(username);
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
  }, []);

  // function to handle the clicking of a different tab
  const handleTabChange = (event: React.SyntheticEvent, value: string) => {
    setActiveTab(value);
  };

  return (
    <>
      {/* block checks that the userInfo is present, and then calls the UserProfile component */}
      {userInfo && (
        <UserProfile
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          profileImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9p_svIjwA810BURgFBTU0V6fNjiU9MRbUXQ&s"
        ></UserProfile>
      )}

      <Box>
        {/* Material-UI Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="profile tabs"
        >
          <Tab label="Vibechecks" value="vibechecks" />
          <Tab label="Friends" value="friends" />
        </Tabs>

        {/* Conditional rendering based on active tab */}
        {/* {activeTab === 'vibechecks' && <VibeChecks />} */}
        {activeTab === 'vibechecks' && <p>vibeChecks</p>}
        {activeTab === 'friends' && (
          <FriendList usernameProp={username}></FriendList>
        )}
      </Box>
    </>
  );
};

export default Profile;

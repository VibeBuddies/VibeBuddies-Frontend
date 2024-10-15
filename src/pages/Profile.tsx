import React, { useEffect, useState } from 'react';
import UserProfile from '../components/profile-header/ProfileHeader';
import getPersonalInformation from '../api/getPersonalnfo';

/* arranges the Profile componenets into an profile page 
which is accessible through a button on the feed page*/

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

const Profile: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserProfileData | null>(null);

  useEffect(() => {
    const fetchPersonalInformation = async () => {
      try {
        const data = await getPersonalInformation();
        // Assuming your API data structure is: { data: { user: { ...userInfo } } }
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

  console.log(userInfo);
  return (
    <>
      {userInfo && (
        <UserProfile
          username={userInfo.username}
          profileImage="fortesting"
          favoriteSong={userInfo.favoriteSong}
          favoriteArtist={userInfo.favoriteArtist}
          favoriteAlbum={userInfo.favoriteAlbum}
          city={userInfo.city}
          state={userInfo.state}
          country={userInfo.country}
          bio={userInfo.bio}
        ></UserProfile>
      )}
    </>
  );
};

export default Profile;

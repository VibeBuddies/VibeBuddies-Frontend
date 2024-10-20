import React, { useEffect, useState } from 'react';
import getFriends from '../../api/getFriends';
import { Typography, Grid } from '@mui/material';
import FriendsCard from './FriendsCard';

// interface for the friends usernames that are returned
interface FriendsDataReturned {
  username?: string;
  profileImage?: string;
  favoriteSong?: string;
  favoriteArtist?: string;
  favoriteAlbum?: string;
  city?: string;
  state?: string;
  country?: string;
  bio?: string;
}

// itnerface for the props that get passed into the component
interface FriendListProps {
  usernameProp: string;
}

// functional component with username passed through
const FriendList: React.FC<FriendListProps> = ({ usernameProp }) => {
  // state to hold the friends
  const [friends, setFriends] = useState<FriendsDataReturned[]>([]);

  // block to get the friends of the user that was passed through
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        // calling the api
        const data = await getFriends(usernameProp);
        if (data?.data?.data.friendList) {
          setFriends(data.data.data.friendList);
        }
      } catch (error) {
        console.log(
          `There was an error while retrieving personal info: ${error}`
        );
      }
    };
    fetchFriends();
  }, [usernameProp]);

  return (
    <>
      {/* grid for all friends */}
      <Grid container spacing={2}>
        {/* conditionally render friend list if friends are present */}
        {friends.length > 0 ? (
          friends.map((friend, index) => (
            <Grid item xs={12} sm={6} md={2} key={index}>
              {/* friendcard compoennt with friend info */}
              <FriendsCard friend={friend}></FriendsCard>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 2 }}>
              No friends.
            </Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default FriendList;

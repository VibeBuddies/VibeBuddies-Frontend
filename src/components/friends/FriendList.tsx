import React, { useEffect, useState, useContext } from 'react';
import getFriends from '../../api/getFriends';
import { Typography, List, ListItem } from '@mui/material';
import FriendCard from './FriendCard';
import { UserContext } from '../Context/UserContext';

// interface for the friends usernames that are returned
interface FriendsDataReturned {
  username?: string;
  profileImageUrl?: string;
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

const FriendList: React.FC<FriendListProps> = ({ usernameProp }) => {
  /**
   * react functional component to get the list of friends of a user
   *
   */

  // state to hold the friends
  const [friends, setFriends] = useState<FriendsDataReturned[]>([]);

  // grabbing information from the usercontext
  const { username: loggedInUser, setProperty } = useContext(UserContext)!;

  // block to make api call to get friends from backend
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        // api function call
        const data = await getFriends(usernameProp);
        // block checks if data contains friendList, if so then sets the friends in state
        if (data?.data?.data.friendList) {
          setFriends(data.data.data.friendList);

          // block checks if logged in user is accessing their profile to update their friendList
          if (loggedInUser === usernameProp) {
            setProperty(
              'friendList',
              new Set(
                data.data.data.friendList.map((friend: any) => friend.username)
              )
            );
          }
        }
      } catch (error) {
        console.log(
          `There was an error while retrieving personal info: ${error}`
        );
      }
    };
    fetchFriends();
  }, [usernameProp]);

  // JSX
  return (
    <>
      {/* checking if friends is empty or not, maps through it if not */}
      {friends.length > 0 ? (
        // list to hold the friend
        <List
          sx={{
            marginLeft: -2,
          }}
        >
          {friends.map((friend, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <FriendCard friend={friend} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      ) : (
        // no friends found
        <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 2 }}>
          No friends.
        </Typography>
      )}
    </>
  );
};

export default FriendList;

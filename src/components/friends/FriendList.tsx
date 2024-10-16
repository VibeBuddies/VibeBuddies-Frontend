import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getFriends from '../../api/getFriends';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Avatar,
  Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
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
  const navigate = useNavigate();

  // block to get the friends of the user that was passed through
  useEffect(() => {
    const fetchFriends = async () => {
      try {
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

  // function to handle navigating to user's profile
  const handleUsernameClick = (username: string | undefined) => {
    if (username) {
      navigate(`/profile/${username}`);
    }
  };

  // block to handle the deleting function
  const handleDeleteFriend = (username: string | undefined) => {};

  return (
    <>
      <Grid container spacing={2}>
        {friends.length > 0 ? (
          friends.map((friend, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia>
                  <Avatar
                    src={
                      friend.profileImage
                        ? friend.profileImage
                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9p_svIjwA810BURgFBTU0V6fNjiU9MRbUXQ&s'
                    }
                    alt={friend.username}
                    sx={{
                      width: 100,
                      height: 100,
                      margin: 'auto',
                      marginTop: 2,
                    }}
                  />
                </CardMedia>
                <CardContent>
                  <Typography
                    variant="h6"
                    onClick={() => handleUsernameClick(friend.username)}
                    sx={{
                      cursor: 'pointer',
                      textAlign: 'center',
                      textDecoration: 'underline',
                    }}
                  >
                    {friend.username}
                  </Typography>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteFriend(friend.username)}
                    sx={{ display: 'block', margin: 'auto', marginTop: 2 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
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

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Avatar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserContext } from '../Context/UserContext';

interface FriendProps {
  friend: {
    username?: string;
    profileImage?: string;
    favoriteSong?: string;
    favoriteArtist?: string;
    favoriteAlbum?: string;
    city?: string;
    state?: string;
    country?: string;
    bio?: string;
  };
}

const FriendsCard: React.FC<FriendProps> = ({ friend }) => {
  // grabbing our logged in username from the usercontext
  const { username: loggedInUser } = useContext(UserContext)!;

  //   intializing our navigate object
  const navigate = useNavigate();

  // function to handle navigating to user's profile
  const handleUsernameClick = (username: string | undefined) => {
    if (username) {
      navigate(`/profile/${username}`);
    }
  };

  // block to handle the deleting function
  const handleDeleteFriend = (username: string | undefined) => {};

  return (
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
        {loggedInUser !== friend.username && (
          <IconButton
            aria-label="delete"
            onClick={() => handleDeleteFriend(friend.username)}
            sx={{ display: 'block', margin: 'auto', marginTop: 2 }}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </CardContent>
    </Card>
  );
};

export default FriendsCard;

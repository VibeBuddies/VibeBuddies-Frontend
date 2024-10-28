import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Box,
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { UserContext } from '../Context/UserContext';
import deleteFriend from '../../api/deleteFriend';
import sendFriendRequest from '../../api/sendFriendRequest';
import getUserByUsername from '../../api/getUserbyUsernameApi';

// interface
interface FriendProps {
  friend: {
    username?: string;
    profileImageUrl?: string;
    favoriteSong?: string;
    favoriteArtist?: string;
    favoriteAlbum?: string;
    city?: string;
    state?: string;
    country?: string;
    bio?: string;
  };
}

const FriendCard: React.FC<FriendProps> = ({ friend }) => {
  /**
   * functional compoenent to display individual user information in card
   *
   */

  // getting information from usercontext
  const [profileImage, setProfileImage] = useState<string>();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        // api function call
        const data = await getUserByUsername(friend.username!);
        // block checks if data contains friendList, if so then sets the friends in state

        if (data?.data?.user?.profileImageUrl) {
          setProfileImage(data.data.user.profileImageUrl);
        }
      } catch (error) {
        console.log(
          `There was an error while retrieving personal info: ${error}`
        );
      }
    };
    fetchFriends();
  }, []);

  const {
    username: loggedInUser,
    setProperty,
    friendList,
  } = useContext(UserContext)!;

  // checking if current user is friend of the logged in user
  let isFriend = friendList?.has(friend.username!);

  // navigate object
  const navigate = useNavigate();

  // function to handle navigating to user's profile when username is clicked, sets editing option to false
  const handleUsernameClick = (username: string | undefined) => {
    if (username) {
      navigate(`/profile/${username}`);
      setProperty('isEditing', false);
    }
  };

  // function to handle the deleting of a friend, updates context friendList
  async function handleDeleteFriend(
    username: string | undefined
  ): Promise<void> {
    await deleteFriend(username!);
    setProperty(
      `friendList`,
      new Set([...friendList!].filter((friend) => friend !== username))
    );
  }

  // function to send a friend request
  async function handleAddFriend(username: string | undefined): Promise<void> {
    await sendFriendRequest(username!);
  }

  // JSX
  return (
    // card for the friend
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: 1,
      }}
    >
      {/* profile image */}
      <Avatar
        src={
          profileImage
            ? profileImage
            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9p_svIjwA810BURgFBTU0V6fNjiU9MRbUXQ&s'
        }
        alt={friend.username}
        sx={{ width: 60, height: 60, marginRight: 2, cursor: 'pointer' }}
        onClick={() => handleUsernameClick(friend.username)}
      />

      {/* username */}
      <CardContent sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <Typography
          variant="h6"
          onClick={() => handleUsernameClick(friend.username)}
          sx={{
            cursor: 'pointer',
          }}
        >
          {friend.username}
        </Typography>
      </CardContent>

      {/* displaying the delete/add button conditionally */}
      {loggedInUser !== friend.username && (
        <Box sx={{ marginLeft: 'auto' }}>
          <IconButton
            color={isFriend ? 'error' : 'primary'}
            onClick={() =>
              isFriend
                ? handleDeleteFriend(friend.username)
                : handleAddFriend(friend.username)
            }
          >
            {isFriend ? <PersonRemoveIcon /> : <PersonAddIcon />}
          </IconButton>
        </Box>
      )}
    </Card>
  );
};

export default FriendCard;

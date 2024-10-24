import React, { useContext } from 'react';
import {
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserContext } from '../Context/UserContext';

interface VibeCheckProps {
  handleDelete(vibe_check_id: string): void;
  vibeCheckInfo: {
    album_id: {
      artist: string;
      cover_url: string;
      name: string;
    };
    dislikes: number;
    likes: number;
    rating: number;
    review: string;
    timestamp: number;
    username: string;
    vibe_check_id: string;
  };
}

const VibeCheckCard: React.FC<VibeCheckProps> = ({
  vibeCheckInfo,
  handleDelete,
}) => {
  // getting information from the context
  const { username: loggedInUser } = useContext(UserContext)!;

  // JSX
  return (
    <>
      <CardMedia
        component="img"
        sx={{ width: 150 }}
        image={vibeCheckInfo.album_id.cover_url}
        alt={vibeCheckInfo.album_id.name}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <CardContent>
          <Typography variant="h6">{vibeCheckInfo.album_id.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {vibeCheckInfo.album_id.artist}
          </Typography>

          <Typography variant="body2" sx={{ marginTop: 1 }}>
            {vibeCheckInfo.review}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginTop: 1 }}
          >
            Rating: {vibeCheckInfo.rating}/5 | Likes: {vibeCheckInfo.likes} |
            Dislikes: {vibeCheckInfo.dislikes}
          </Typography>
        </CardContent>
        {loggedInUser === vibeCheckInfo.username && (
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(vibeCheckInfo.vibe_check_id)}
            sx={{ alignSelf: 'flex-start', marginLeft: 'auto' }}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
    </>
  );
};

export default VibeCheckCard;

import React from 'react';
import { Typography, Box } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AlbumIcon from '@mui/icons-material/Album';
import PersonIcon from '@mui/icons-material/Person';

// interface for information of user component
interface BoxInformationProp {
  property?: string;
  phrase?: string;
}

// mapping phrases to icons
const iconMap = {
  'Favorite Artist': <PersonIcon />,
  'Favorite Album': <AlbumIcon />,
  'Favorite Song': <MusicNoteIcon />,
};

const BoxInformation: React.FC<BoxInformationProp> = ({ property, phrase }) => {
  /**
   * compoennt to handle the displaying of information
   */
  // if not property then display nothing
  if (!property) return null;

  // getting the icon based phrased passed through
  const icon = iconMap[phrase as keyof typeof iconMap];

  // JSX
  return (
    // container to hold the icon and phrase
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      {icon}
      {/* container to hold the phrase passed through */}
      <Box sx={{ ml: 2 }}>
        <Typography variant="body2" color="textSecondary">
          {phrase}
        </Typography>
        <Typography variant="h6">{property}</Typography>
      </Box>
    </Box>
  );
};

export default BoxInformation;

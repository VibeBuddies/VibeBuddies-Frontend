import React from 'react';
import { Typography, Box } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AlbumIcon from '@mui/icons-material/Album';
import PersonIcon from '@mui/icons-material/Person';

interface BoxInformationProp {
  property?: string;
  phrase?: string;
}

// mapping phrase to icon
const iconMap = {
  'Favorite Artist': <PersonIcon />,
  'Favorite Album': <AlbumIcon />,
  'Favorite Song': <MusicNoteIcon />,
};

const BoxInformation: React.FC<BoxInformationProp> = ({ property, phrase }) => {
  /**
   * compoennt to handle the displaying of information
   */
  if (!property) return null;

  const icon = iconMap[phrase as keyof typeof iconMap];

  // JSX
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      {icon}
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

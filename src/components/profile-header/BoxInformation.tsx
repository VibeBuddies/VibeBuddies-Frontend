import React from 'react';
import { Typography } from '@mui/material';

interface BoxInformationProp {
  property?: string;
  phrase?: string;
}

const BoxInformation: React.FC<BoxInformationProp> = ({ property, phrase }) => {
  if (!property) return null;
  return (
    <Typography>
      {phrase}: {property}
    </Typography>
  );
};

export default BoxInformation;

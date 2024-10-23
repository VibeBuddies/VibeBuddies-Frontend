import React from 'react';
import { Typography } from '@mui/material';

interface BoxInformationProp {
  property?: string;
  phrase?: string;
}

const BoxInformation: React.FC<BoxInformationProp> = ({ property, phrase }) => {
  /**
   * functional component to show the information of the user
   *
   */

  // returns nothing is property is empty
  if (!property) return null;

  // JSX
  return (
    <Typography>
      {phrase}: {property}
    </Typography>
  );
};

export default BoxInformation;

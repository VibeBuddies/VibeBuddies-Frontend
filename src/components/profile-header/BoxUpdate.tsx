import React from 'react';
import { Grid, TextField } from '@mui/material';

// interface props for BoxUpdate
interface BoxUpdateProp {
  name?: string;
  property?: string;
  sx?: any;
  handleChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

const BoxUpdate: React.FC<BoxUpdateProp> = ({
  name,
  property,
  handleChange,
  sx,
  ...rest
}) => {
  /**
   * functional component to handle the editing inputs
   *
   */

  return (
    // grid for textfield
    <Grid item xs={3} sx={sx}>
      <TextField
        label={name}
        name={name}
        value={property}
        onChange={handleChange}
        {...rest}
      />
    </Grid>
  );
};

export default BoxUpdate;

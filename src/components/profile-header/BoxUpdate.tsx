import React from 'react';
import { Grid, TextField } from '@mui/material';

interface BoxUpdateProp {
  name?: string;
  property?: string;
  handleChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

const BoxUpdate: React.FC<BoxUpdateProp> = ({
  name,
  property,
  handleChange,
  ...rest
}) => {
  /**
   * functional component to handle the editing inputs
   *
   */

  return (
    <Grid item xs={3}>
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

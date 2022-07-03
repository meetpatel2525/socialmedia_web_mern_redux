import React from 'react';



// this component is use for get clear the code of inputfild 

import { TextField, Grid, InputAdornment, IconButton } from  '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// for handel input filds 

const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => (
 
 <Grid item xs={12} sm={half ? 6 : 12}>  {/* //harf is for make it dim\nemic */}
    
    <TextField
      name={name}
      onChange={handleChange}
      variant="outlined"
      required
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
      //if input type is passowrd than its run 
      InputProps={name === 'password' ? {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleShowPassword}>
              {type === 'password' ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      } : null}
    />
  </Grid>
);

export default Input;
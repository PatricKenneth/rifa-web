import React from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed', 
        bottom: '20px', 
        right: '48px', 
    },
  }));
  
  
export default function FloatingButton({ onFinish }) {
    const classes = useStyles();
  return (
      <Box className={classes.root}>
        <Button variant="contained" color='primary' style={{ height: '48px' }} onClick={onFinish} >
            Reservar número(s)
        </Button>
      </Box>
  );
}

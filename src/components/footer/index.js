import { Box, Grid, IconButton, Typography } from '@material-ui/core';
import { Facebook, Instagram } from '@material-ui/icons';
import React from 'react';

function Footer() {
     return (
         <Grid container direction='column' style={{ padding: '16px', border: '1px solid white'}}>
             <Typography variant='h5' align='center'>
                Está com dúvidas?
             </Typography>
             <Typography align='center'>
                Fale com José Claudio
             </Typography>
             <Typography variant='body2' align='center'>
                Contato:
             </Typography>
             <Typography align='center'>
               <a href='https://api.whatsapp.com/send?phone=5588988627931&text=Tire%20suas%20d%C3%BAvidas%3A' target="_blank" rel="noreferrer">(88) 9 8862-7931</a>
             </Typography>
             <Typography align='center'>
                Fale com Vicente de Paulo
             </Typography>
             <Typography variant='body2' align='center'>
                Contato:
             </Typography>
             <Typography align='center'>
                <a href='https://api.whatsapp.com/send?phone=5588988037607&text=Tire%20suas%20d%C3%BAvidas%3A' target="_blank" rel="noreferrer">(88) 9 8803-7607</a>
             </Typography>
             <Box style={{ display: 'flex', justifyContent: 'center' }}>
             <IconButton 
               target='_blank'
               href='https://www.facebook.com/profile.php?id=100013360758362'
               color="primary" 
               aria-label="upload picture" 
               component="a" 
               style={{ margin: '8px' }}
            >
               <Facebook />
            </IconButton>
            <IconButton 
               target='_blank'
               href='https://www.instagram.com/claudiosantosofficial/'
               color="primary" 
               aria-label="upload picture" 
               component="a"
               style={{ margin: '8px' }}
             >
               <Instagram />
            </IconButton>
             </Box>
         </Grid>
     );
}

export default Footer;
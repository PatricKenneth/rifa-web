import { Grid, Typography } from '@material-ui/core';
import React from 'react';

function Footer() {
     return (
         <Grid container direction='column' style={{ padding: '16px', border: '1px solid white'}}>
             <Typography variant='h5' align='center'>
                Está com dúvidas?
             </Typography>
             <Typography align='center'>
                Fale com Sanfoneiro
             </Typography>
             <Typography variant='body2' align='center'>
                Contato:
             </Typography>
             <Typography align='center'>
                (88) 9 8888-8888
             </Typography>
             <Typography align='center'>
                Fale com Sanfoneiro
             </Typography>
             <Typography variant='body2' align='center'>
                Contato:
             </Typography>
             <Typography align='center'>
                (88) 9 8888-8888
             </Typography>
         </Grid>
     );
}

export default Footer;
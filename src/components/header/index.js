import { Box, Grid, makeStyles } from '@material-ui/core';
import React from 'react';

const styles = makeStyles((theme) => ({
    divLogo: {
        marginBottom: '24px',
        width: '100%',
        [theme.breakpoints.only('xs')]: {
            justifyContent: 'center',
            display: 'flex',
        }
    },
    logo: {
        position: 'relative', 
        left: '80px',
        [theme.breakpoints.down('md')]: {
            left: '0px',
        },
    }
}));

function Header() {
    const classes = styles();
    return (
        <Grid container>
            <Box className={classes.divLogo} >
                <img className={classes.logo} src='./logo192.png' alt='' style={{ maxWidth: '200px', height: '135px', }} />
            </Box>
        </Grid>
    );
}

export default Header;
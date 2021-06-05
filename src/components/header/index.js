import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';

const styles = makeStyles((theme) => ({
    logo: {
        position: 'relative', 
        left: '80px',
        width: '100%',  
        maxWidth: '200px', 
        height: '135px',
        [theme.breakpoints.down('md')]: {
            left: '0px',
        },
        [theme.breakpoints.down('xs')]: {
            left: '0px',
            justifyContent: 'center',
        }
    }
}));

function Header() {
    const classes = styles();
    return (
        <Grid container>
            <img className={classes.logo} src='./logo192.png' alt='' />
        </Grid>
    );
}

export default Header;
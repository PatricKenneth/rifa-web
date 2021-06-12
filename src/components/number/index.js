import { Button, makeStyles, Popover, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { getStatus, getOnlyAvailable } from '../../utils/getStatus';

const colors = {
    Todos : 'inherit',
    Disponível: 'default',
    Reservado : 'primary',
    Pago: '#3fbb3f',
    'Aguardando Pagamento': 'secondary'
}

const styles = makeStyles((theme) => ({
    numberSelected: {
        border: '1px solid green',
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
}))

function Number({ number, setNumber }){
    const classes = styles();
    const [selected, setSelected] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    function handleSelected() {
        if(getOnlyAvailable(number.status)){
            setSelected(!selected);
            setNumber(number, !selected)
        }
    }

    const button = () => {
        if( getStatus(number.status) === getStatus('Disponível') ) {
            return <Button 
                        onClick={handleSelected}
                        className={selected ? classes.numberSelected : ''} 
                        variant='contained' 
                        color={colors[number.status]} 
                        style={{ margin: '8px' }}
                    >
                        {('000' + number.num).slice(-3)}
                    </Button>
        }
        if( getStatus(number.status) === getStatus('Aguardando Pagamento') ) {
            return <Button 
                        onClick={handleSelected}
                        className={selected ? classes.numberSelected : ''} 
                        variant='contained' 
                        color={colors[number.status]} 
                        style={{ margin: '8px' }}
                        aria-owns={open ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                    >
                        {('000' + number.num).slice(-3)}
                    </Button>
        }
        if(getStatus(number.status) === getStatus('Pago')) {
            return  <Button 
                        variant='contained' 
                        style={{ margin: '8px', background: `${colors[number.status]}` }}
                        aria-owns={open ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                    >
                        {('000' + number.num).slice(-3)}
                    </Button>
        } else {
            return  <Button 
                        onClick={handleSelected}
                        className={selected ? classes.numberSelected : ''} 
                        variant='contained' 
                        color={colors[number.status]} 
                        style={{ margin: '8px' }}
                        aria-owns={open ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                    >
                        {('000' + number.num).slice(-3)}
                    </Button>
        }
    }

    return (
        <div>
            {button()}
            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                { number.customer && 
                    <Typography variant='caption'>
                        {`
                            ${number.customer.name.substring(4, 0).trim()}...
                            ${number.customer.lastName.substring(4, 0).trim()}
                        `}
                    </Typography>
                }
            </Popover>
        </div>
    )
}

export default Number;
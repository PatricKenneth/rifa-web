import { Button, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { getStatus, getOnlyAvailable } from '../../utils/getStatus';

const colors = {
    Todos : 'inherit',
    Disponível: 'default',
    Reservado : 'primary',
    Pago: '#3fbb3f',
}

const styles = makeStyles((theme) => ({
    numberSelected: {
        border: '1px solid green',
    }
}))

function Number({ number, setNumber }){
    const classes = styles();
    const [selected, setSelected] = useState(false);

    function handleSelected() {
        if(getOnlyAvailable(number.status)){
            setSelected(!selected);
            setNumber(number, !selected)
        }
    }

    const button = () => {
        if(getStatus(number.status) === getStatus('Pago')) {
            return  <Button 
                        variant='contained' 
                        style={{ margin: '8px', background: `${colors[number.status]}` }}
                    >
                        {number.num}
                    </Button>
        } else {
            return  <Button 
                        onClick={handleSelected}
                        className={selected ? classes.numberSelected : ''} 
                        variant='contained' 
                        color={colors[number.status]} 
                        style={{ margin: '8px' }}
                        id={number.num}
                    >
                        {number.num}
                    </Button>
        }
    }
    return (
        button()
    )
}

export default Number;
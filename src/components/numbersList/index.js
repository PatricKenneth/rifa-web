import { Button } from '@material-ui/core';
import React from 'react';
import { getStatus } from '../../utils/getStatus';

const colors = {
    Todos : 'inherit',
    Disponível: 'default',
    Reservado : 'primary',
    Pago: '#3fbb3f',
}

function NumbersList({ numbersList, }){
    const button = (number) => {
        if(getStatus(number.status) === getStatus('Pago')) {
            return  <Button key={number.num} variant='contained' style={{ margin: '8px', background: `${colors[number.status]}` }}>
                        {number.num}
                    </Button>
        } else {
            return  <Button key={number.num} variant='contained' color={colors[number.status]} style={{ margin: '8px' }}>
                        {number.num}
                    </Button>
        }
    }
    return (
        numbersList.map( (number) => 
            button(number)
        )
    )
}

export default NumbersList;
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import Number from '../number';
import numbersService from '../../resources/services/numbersService';
import ticketsService from '../../resources/services/ticketsService';
import { getStatus } from '../../utils/getStatus';
import FloatingButton from '../floatingButton';
import ModalConfirm from '../modalConfirm';
import RegulationDescription from '../regulationDescription';

function getQuantity(numbers, status = '') {
    if(status) {
        return numbers.filter((number)=> getStatus(number.status) === getStatus(status)).length;
    } else {
        return numbers.length;
    }
}

const CUSTOMER_INITIAL = {
    name: '',
    lastname: '',
    mobilePhone: '',
}

function Content() {
    const [numbers, setNumbers] = useState({
        ALL: [],
        filtered: [],
    });
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [query, setQuery] = useState('');
    const [stateModal, setStateModal] = useState(false);
    const [customer, setCustomer] = useState(CUSTOMER_INITIAL);

    async function getNumbers(){
        let response = await numbersService.get(query);
        let dataSource = response.data;
        setNumbers((prevNumbers) => ({
            ...prevNumbers,
            filtered: dataSource,
        }));
        response = await numbersService.get();
        dataSource = response.data;
        setNumbers((prevNumbers) => ({
            ...prevNumbers,
            ALL: dataSource,
        }));
    }
    
    useEffect(() => {
        getNumbers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    function handleSelectedNumber(number, isSelected) {
        if (isSelected) {
            setSelectedNumbers((prevSelectedNumbers) => ([
                ...prevSelectedNumbers,
                { ...number },
            ]));
        } else {
            setSelectedNumbers((prevSelectedNumbers) => ([
                ...prevSelectedNumbers.filter((element) => element.id !== number.id),
            ]));
        }
    }

    async function onFinish() {
        let ticket = {
            numbers: selectedNumbers,
            ...customer,
        };
        try {
            const response = await ticketsService.create(ticket);
            ticket = response.data;
            setStateModal(false);
            setCustomer(CUSTOMER_INITIAL);
            setSelectedNumbers([]);
            getNumbers();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Grid container direction='column'>
            <Grid item style={{ marginBottom: '40px', borderTop: '1px solid white', }}>
                <Typography variant='h3' align='center'>
                    Sorteio: Concorra a um terreno 8m x 30m
                </Typography>
                <Typography variant='h4' align='center'>
                    Valor do número R$ 100,00
                </Typography>
            </Grid>
            <Grid item style={{ borderBottom: '1px solid white', marginBottom: '40px', }}>
                <Box style={{ display: 'flex', justifyContent: 'center', margin: '16px' }}>
                    <img src='./logo192.png' alt='' style={{ width: '100%',  maxWidth: '400px', }} />
                </Box>
            </Grid>
            <Grid item container justify='center' style={{ marginBottom: '24px' }}>
                <Grid item>
                    <Button 
                        variant='contained' 
                        color='inherit' 
                        style={{ margin: '16px' }}
                        onClick={() => setQuery('')}
                    >
                        Todos ( { getQuantity(numbers.ALL) } )
                    </Button>
                </Grid>
                <Grid item>
                    <Button 
                        variant='outlined' 
                        color='default' 
                        style={{ margin: '16px' }}
                        onClick={() => setQuery( getStatus('Disponível') )}
                    >
                        Disponíveis ( { getQuantity(numbers.ALL, 'Disponível') } )
                    </Button>
                </Grid>
                <Grid item>
                    <Button 
                        variant='contained' 
                        color='primary' 
                        style={{ margin: '16px' }}
                        onClick={() => setQuery( getStatus('Reservado') )}
                    >
                        Reservados ( { getQuantity(numbers.ALL, 'Reservado') } )
                    </Button>
                </Grid>
                <Grid item>
                    <Button 
                        variant='contained' 
                        style={{ margin: '16px', 
                        background: '#3fbb3f' }} 
                        onClick={() => setQuery( getStatus('Pago') )}
                    >
                        Pagos ( { getQuantity(numbers.ALL, 'Pago') } )
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant='contained' style={{ margin: '16px', background: '#e6e641' }}>
                        Consulte seu número
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant='outlined' color='secondary' style={{ margin: '16px' }}>
                        Clique para pagar
                    </Button>
                </Grid>
            </Grid>
            <Grid item container justify='center' style={{ marginBottom: '120px', borderBottom: '1px solid white', paddingBottom: '16px' }}>
                {numbers.filtered.map((number) => <Number key={number.num} number={number} setNumber={handleSelectedNumber} />)}
            </Grid>
            <Grid item style={{ borderLeft: '1px solid white', paddingLeft: '8px', marginBottom: '24px' }}>
                <RegulationDescription /> 
            </Grid>
            {selectedNumbers.length > 0 && <FloatingButton onFinish={() => setStateModal(true)} />}
            <ModalConfirm 
                title='Confirma número(s)'
                content={`Números selecionados: ${
                    selectedNumbers.map((element) => element.num).join(', ')}
                `}
                stateModal={stateModal} 
                setStateModal={setStateModal} 
                customer={customer}
                setCustomer={setCustomer}
                onFinish={onFinish}
            />   
        </Grid>
    );
}

export default Content;
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import Number from '../number';
import numbersService from '../../resources/services/numbersService';
import { isReservedOrPaid, getStatus } from '../../utils/getStatus';
import FloatingButton from '../floatingButton';
import ModalConfirm from '../modalConfirm';
import ModalSearch from '../modalSearch';
import ModalPaid from '../modalPaid';
import RegulationDescription from '../regulationDescription';
import moment from 'moment';
import ModalInfo from '../modalInfo';

moment.locale('pt-br'); 

function getQuantity(numbers, status = '') {
    if(status) {
        return numbers.filter((number)=> getStatus(number.status) === getStatus(status)).length;
    } else {
        return numbers.length;
    }
}

function getTotalValueTicket(numbers) {
    return parseFloat(numbers.map((element) => element.amount)
    .reduce((total, amount) => total + amount))
    .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 2,
    })
}

const CUSTOMER_INITIAL = {
    name: '',
    lastName: '',
    mobilePhone: '',
}

function Content() {
    const [numbers, setNumbers] = useState({
        ALL: [],
        filtered: [],
    });
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [query, setQuery] = useState('');
    const [stateModal, setStateModal] = useState({
        modalConfirm: false,
        modalSearch: false,
        modalPaid: false,
        modalInfo: false,
    });
    const [customer, setCustomer] = useState(CUSTOMER_INITIAL);
    const [loading, setLoading] = useState(false);
    
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
        let status = query === getStatus('Pago') ? 'Pago' : query;
        status = query === getStatus('Reservado') ? 'Reservado' : query;
        if(isReservedOrPaid(status)) {
            setSelectedNumbers([]);
        }
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

    async function onSearch() {
        if(!loading){
            setLoading(true);
        }
        if(customer.mobilePhone){
            const { mobilePhone } = customer;
            try {
                const response = await numbersService.findBy({
                    mobilePhone,
                });
                setNumbers((prevNumbers) => ({
                    ...prevNumbers,
                    filtered: [],
                }));
                setNumbers((prevNumbers) => ({
                    ...prevNumbers,
                    filtered: response.data,
                }));
                setCustomer(CUSTOMER_INITIAL);
            } catch (error) {
                console.log(error);
            }
            setStateModal((prevStateModal) => ({
                ...prevStateModal,
                modalSearch: false,
            }));
        }
        setLoading(false);
    }

    async function onFinish() {
        if(!loading){
            setLoading(true);
        }
        let ticket = {
            numbers: selectedNumbers,
            ...customer,
            status: getStatus('Reservado'),
        };
        if(customer.name && customer.lastName && customer.mobilePhone){
            try {
                await numbersService.create(ticket);
                setCustomer(CUSTOMER_INITIAL);
                setSelectedNumbers([]);
                getNumbers();
            } catch (error) {
                console.log(error);
            }
            setStateModal((prevStateModal) => ({
                ...prevStateModal,
                modalConfirm: false,
            }));
        }
        setLoading(false);
    }

    async function onPaid() {
        setStateModal((prevStateModal) => ({
            ...prevStateModal,
            modalPaid: true,
        }));

        if(!loading){
            setLoading(true);
        }
        let ticket = {
            numbers: selectedNumbers,
            ...customer,
            status: getStatus('Aguardando Pagamento'),
        };
        if(customer.name && customer.lastName && customer.mobilePhone){
            try {
                await numbersService.create(ticket);
                setCustomer(CUSTOMER_INITIAL);
                setSelectedNumbers([]);
                getNumbers();
            } catch (error) {
                console.log(error);
            }
            setStateModal((prevStateModal) => ({
                ...prevStateModal,
                modalPaid: false,
                modalInfo: true,
            }));
        }
        setLoading(false);
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
                    <Button 
                        variant='contained' 
                        style={{ margin: '16px', background: '#e6e641' }}
                        onClick={() => 
                            setStateModal((prevStateModal) => ({
                                ...prevStateModal,
                                modalSearch: true,
                            }))
                        }
                    >
                        Consulte seu número
                    </Button>
                </Grid>
                <Grid item>
                    <Button 
                        variant='outlined' 
                        color='secondary' 
                        style={{ margin: '16px' }}
                        onClick={onPaid}
                        disabled={!(selectedNumbers.length > 0)}
                    >
                        Clique para pagar
                    </Button>
                </Grid>
                <Grid item>
                    <Button 
                        variant='contained' 
                        color='secondary' 
                        style={{ margin: '16px' }}
                        onClick={() => 
                            setStateModal((prevStateModal) => ({
                                ...prevStateModal,
                                modalInfo: true,
                            }))
                        }
                    >
                        Dados de pagamento
                    </Button>
                </Grid>
            </Grid>
            <Grid item container justify='center' style={{ marginBottom: '120px', borderBottom: '1px solid white', paddingBottom: '16px' }}>
                {numbers.filtered.map((number) => <Number key={number.num} number={number} setNumber={handleSelectedNumber} />)}
            </Grid>
            <Grid item style={{ borderLeft: '1px solid white', paddingLeft: '8px', marginBottom: '24px' }}>
                <RegulationDescription /> 
            </Grid>
            {selectedNumbers.length > 0 && 
                <FloatingButton 
                    onFinish={() => 
                        setStateModal((prevStateModal) => ({
                            ...prevStateModal,
                            modalConfirm: true,
                        }))
                    } 
                />
            }
            <ModalConfirm 
                title='Confirmar número(s)'
                content={[
                    `Números selecionados: ${selectedNumbers.map((element) => element.num).join(', ')}`,
                    `Valor por número: ${
                        parseFloat(100).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            maximumFractionDigits: 2,
                        })
                    }`,
                    `Quantidade de número escolhido: ${selectedNumbers.length}`,
                    `Valor total do bilhete: ${selectedNumbers.length > 0 && getTotalValueTicket(selectedNumbers)}`,
                    `Números reservados até: ${moment().add(10, 'days').format('DD/MM/YYYY')}`
                ]}
                stateModal={stateModal.modalConfirm} 
                setStateModal={setStateModal} 
                customer={customer}
                setCustomer={setCustomer}
                onFinish={onFinish}
                loading={loading}
            />
            <ModalPaid 
                title='Confirmar pagamento'
                content={[
                    `Números selecionados: ${selectedNumbers.map((element) => element.num).join(', ')}`,
                    `Valor por número: ${
                        parseFloat(100).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            maximumFractionDigits: 2,
                        })
                    }`,
                    `Quantidade de número escolhido: ${selectedNumbers.length}`,
                    `Valor total do bilhete: ${selectedNumbers.length > 0 && getTotalValueTicket(selectedNumbers)}`,
                    `Enviar comprovante de pagamento`
                ]}
                stateModal={stateModal.modalPaid} 
                setStateModal={setStateModal} 
                customer={customer}
                setCustomer={setCustomer}
                onFinish={onPaid}
                loading={loading}
            />
            <ModalInfo
                title='Informações de pagamento'
                content={[
                    `Pix 091.677.694.89`,
                    `José Cláudio Vieira Santo`,
                    `.`,
                    `.`,
                    `.`,
                    `Agência. 0776`,
                    `Op. 013`,
                    `C. P. 9570-4`,
                    `José Cláudio Vieira Santo`,
                    `.`,
                    `.`,
                    `.`,
                ]}
                stateModal={stateModal.modalInfo} 
                setStateModal={setStateModal} 
            />
            <ModalSearch
                title='Buscar número(s)'
                stateModal={stateModal.modalSearch} 
                setStateModal={setStateModal} 
                customer={customer}
                setCustomer={setCustomer}
                onSearch={onSearch}
                loading={loading}
            />
        </Grid>
    );
}

export default Content;
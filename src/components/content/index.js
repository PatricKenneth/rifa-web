import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import NumbersList from '../numbersList';
import numbersService from '../../resources/services/numbersService';
import { getStatus } from '../../utils/getStatus';

function getQuantity(numbers, status = '') {
    if(status) {
        return numbers.filter((number)=> getStatus(number.status) === getStatus(status)).length;
    } else {
        return numbers.length;
    }
}

function Content() {
    const [numbers, setNumbers] = useState({
        ALL: [],
        filtered: [],
    });
    const [query, setQuery] = useState('');
    
    useEffect(() => {
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
        getNumbers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

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
                <NumbersList numbersList={numbers.filtered} />
            </Grid>
            <Grid item style={{ borderLeft: '1px solid white', paddingLeft: '8px', marginBottom: '24px' }}>
                <Typography variant='h5' style={{ lineHeight: '64px' }}>
                    Regulamento/Descrição: Data do Sorteio : 30/10/2021
                </Typography>
                <Typography variant='body2' style={{ lineHeight: '24px', fontWeight: 'bold' }}>
                    Terreno próprio pra construção com tamanho 8mx30m no distrito de Missão 
                </Typography>
                <Typography variant='body2' style={{ lineHeight: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
                    Nova na cidade de Missão Velha ou se preferir o valor de R$ 4.000,00
                </Typography>
                <Typography variant='body2' style={{ lineHeight: '24px', fontWeight: 'bold' }}>
                    Custos cartorial por conta do vencedor. Documentação Particular. Imóvel no zoneamento Rural,
                </Typography>
                <Typography variant='body2' style={{ lineHeight: '24px', fontWeight: 'bold' }}>
                    com água e energia próximo. Fica a 20km da cidade de Juazeiro do Norte, 17km da cidade de Barbalha 
                </Typography>
                <Typography variant='body2' style={{ lineHeight: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
                    e 17 km da cidade de Missão Velha. Acesso asfalto e estrada vicinal.
                </Typography>
                <Typography variant='body2' style={{ lineHeight: '24px' }}>
                    O sorteio e Baseado pela Loteria Federal para eliminarmos quaisquer dúvida ou margem para fraude!! 
                </Typography>
                <Typography variant='h5' style={{ lineHeight: '24px', maxWidth: '505px', margin: '24px 0px' }}>
                    Não aceitamos depósitos por envelope ou Doc, somente transferência, pix e TED.
                </Typography>
                <Typography variant='body2' style={{ lineHeight: '24px' }}>
                    Caso não tenha interesse pelo terreno podemos viabilizar o pagamento em dinheiro, valor de R$ 4.000,00,
                </Typography> 
                <Typography variant='body2' style={{ lineHeight: '24px' }}>
                    pagamento em até 72 horas após o sorteio e mediante depósito bancário via TED ou PIX no nome do vencedor. 
                </Typography>   
            </Grid>
        </Grid>
    );
}

export default Content;
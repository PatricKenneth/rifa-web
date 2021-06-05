import React from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core';

function Content() {
    return (
        <Grid container direction='column' style={{ padding: '24px' }}>
            <Grid item style={{ marginBottom: '40px', borderTop: '1px solid white', }}>
                <Typography variant='h3' align='center'>
                    Ação entre amigos
                </Typography>
                <Typography variant='h4' align='center'>
                    Concorra a um terreno 8m x 30m
                </Typography>
                <Typography variant='h4' align='center'>
                    R$ 100,00
                </Typography>
            </Grid>
            <Grid item style={{ borderBottom: '1px solid white', marginBottom: '40px', }}>
                <Box style={{ display: 'flex', justifyContent: 'center', margin: '16px' }}>
                    <img src='./logo192.png' alt='' style={{ width: '100%',  maxWidth: '400px', }} />
                </Box>
            </Grid>
            <Grid item container justify='center'>
                <Grid item>
                    <Button variant="outlined" color="primary" style={{ margin: '16px' }}>
                        Todos ( 300 )
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" style={{ margin: '16px' }}>
                        Disponíveis ( 300 )
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" style={{ margin: '16px' }} color="primary">
                        Reservados ( 300 )
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" style={{ margin: '16px' }}>
                        Pagos ( 300 )
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" style={{ margin: '16px', background: '#e6e641' }}>
                        Consulte seu(s) número(s)
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" style={{ margin: '16px', background: '#3fbb3f' }}>
                        Clique para pagar
                    </Button>
                </Grid>
            </Grid>
            <Grid item style={{ borderLeft: '1px solid white', paddingLeft: '24px' }}>
                <Typography variant='h5' style={{ lineHeight: '64px' }}>
                    Regulamento/Descrição
                </Typography>
                <Typography variant='body2' style={{ lineHeight: '64px' }}>
                    Sorteio entre amigos, 
                </Typography>
                <Typography variant='body2' style={{ lineHeight: '24px' }}>
                    Para quem já me conhece sabe que já estamos no quinto instrumento desse porte que entregamos!!
                </Typography>
                <Typography variant='body2' style={{ lineHeight: '24px' }}>
                    O sorteio e Baseado pela Loteria Federal para eliminarmos quaisquer dúvida ou margem para fraude!! 
                </Typography>
                <Typography variant='h5' style={{ lineHeight: '24px', maxWidth: '505px', margin: '24px 0px' }}>
                    Não aceitamos depósitos por envelope ou Doc, somente transferência,pix,TED...
                </Typography>
                <Typography variant='body2' style={{ lineHeight: '24px' }}>
                    As Despesas de envio são 100% custeadas pelo ganhador, 
                </Typography>
                <Typography variant='body2' style={{ lineHeight: '24px' }}>
                    Caso não tenha interesse pelo instrumento podemos viabilizar o pagamento em dinheiro!! 
                </Typography>   
            </Grid>
        </Grid>
    );
}

export default Content;
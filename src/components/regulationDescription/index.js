import { Typography } from '@material-ui/core';
import React from 'react';

function RegulationDescription() {
    return (
        <>
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
                O sorteio é baseado pela Loteria Federal para eliminarmos quaisquer dúvida ou margem para fraude!! 
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
        </>
    );
}

export default RegulationDescription;
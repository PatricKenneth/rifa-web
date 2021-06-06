const NumbersStatus = {
    Disponível: 'AVAILABLE',
    Reservado: 'RESERVED',
    Pago: 'PAID',
}

export function getStatus(status){
    return NumbersStatus[status];
}
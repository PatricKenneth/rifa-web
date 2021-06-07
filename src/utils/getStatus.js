const NumbersStatus = {
    Disponível: 'AVAILABLE',
    Reservado: 'RESERVED',
    Pago: 'PAID',
}

export function getStatus(status){
    return NumbersStatus[status];
}

export function getOnlyAvailable(status) {
    return NumbersStatus[status] === NumbersStatus.Disponível;
}
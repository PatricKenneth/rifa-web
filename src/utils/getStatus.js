const NumbersStatus = {
    Disponível: 'AVAILABLE',
    Reservado: 'RESERVED',
    Pago: 'PAID',
    'Aguardando Pagamento': 'AWAITING_PAYMENT',
}

export function getStatus(status){
    return NumbersStatus[status];
}

export function getOnlyAvailable(status) {
    return NumbersStatus[status] === NumbersStatus.Disponível;
}

export function isReservedOrPaid(status) {
    return (NumbersStatus[status] === NumbersStatus.Reservado)
            || (NumbersStatus[status] === NumbersStatus.Pago);
}
import reservasMock from '../mocks/reservas.mock.js'

export default class ReservasDaoMemory {
  
    constructor () {
        this.reservas = reservasMock
    }

getAllReservas () {
    res.send ('Reservas encontradas: ')
    return this.reservas
}

getReservaById(id) {
    const reserva = this.reservas.find(reserva => 
        reserva.id === parseInt(id));
    if (reserva) {
        return reserva;
    } else {
        return { message: 'Reserva no encontrada' };
    }
}

getReservaByApellido(apellido) {
    const resultado = this.reservas.filter(reserva => 
       reserva.apellido.toLowerCase() === apellido.toLowerCase());
    return resultado;
}


createReservas(reserva) {
    this.reservas.push(reserva);
    return true;
}

updateReserva(data) {
    let modReserva = null;
    this.reservas = this.reservas.map(reserva => {
        if (reserva.id === data.id) {
            reserva = { ...reserva, ...data };  // Mejor usar spread operator para actualizar la reserva
            modReserva = reserva;
        }
        return reserva;
    });
    return modReserva;
}

deleteReserva(id) {
    const oldLength = this.reservas.length;
    this.reservas = this.reservas.filter(reserva => reserva.id !== parseInt(id));
    return oldLength !== this.reservas.length;
}
}
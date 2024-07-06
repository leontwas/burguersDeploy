import reservasMock from '../db/mocks/reservas.mock.js'
import ReservasHelpers from '../helpers/reservas.helpers.js'

export default class ReservasControllers {

    constructor() {
        this.reservas = reservasMock
        this.helpers = new ReservasHelpers()
    }

    getAllReservas = (req, res) => {
        res.json(this.reservas)
    }

    getReservaById = (req, res) => {
        const { id } = req.params
        const reserva = this.reservas.find(reserva => reserva.reserva_id === parseInt(id))
        if (reserva) {
            res.json(reserva)
        } else {
            res.status(404).send('Reserva no encontrada')
        }
    }

    createReservas = (req, res) => {
        const nuevaReserva = this.helpers.parseReserva(req.body)
        this.reservas.push(nuevaReserva)
        res.send('Reserva creada exitosamente')
    }

    updateReservas = (req, res) => {
        const { id } = req.params
        const reservaIndex = this.reservas.findIndex(reserva => reserva.reserva_id === parseInt(id))
        if (reservaIndex !== -1) {
            const updatedReserva = this.helpers.parseReserva(req.body)
            this.reservas[reservaIndex] = { ...this.reservas[reservaIndex], ...updatedReserva }
            res.send('Reserva actualizada exitosamente')
        } else {
            res.status(404).send('Reserva no encontrada')
        }
    }

    deleteReservas = (req, res) => {
        const { id } = req.params
        this.reservas = this.reservas.filter(reserva => reserva.reserva_id !== parseInt(id))
        res.send('Reserva eliminada exitosamente')
    }

}

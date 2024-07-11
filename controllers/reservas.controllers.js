import ReservasDaoMysql from '../db/daos/reservas.dao.mysql.js';
import ReservasHelpers from '../helpers/reservas.helpers.js';

export default class ReservasControllers {

     constructor() {
        this.db = ReservasDaoMysql
        this.helpers = new ReservasHelpers();
        }

        getAllReservas = async (req, res) => {
                const usuarios = await this.db.getAllReservas()
                res.json(reservas);
                }

        getReservaById = async (req, res) => {
                const { reserva_id } = req.params;
                const reserva = await this.db.getReservaById()
                res.json(reserva);
        }
        buscarReservaPorApellido = async (req, res) => {
                const { apellido } = req.query;
                const resultado = await reservas.filter(r => r.apellido.toLowerCase().includes(apellido.toLowerCase()));
                res.json(resultado);
        }

        buscarReservaPorEmail = async (req, res) => {
                const { email } = req.query;
                const resultado = await reservas.filter(r => r.email.toLowerCase() === email.toLowerCase());
                res.json(resultado)
        }

        buscarReservaPorFecha = async (req, res) => {
                const { fecha } = req.query;
                const resultado = await reservas.filter(r => r.fecha === fecha);
                res.json(resultado)
        }

        createReserva = async (req, res) => {
                const reserva = this.helpers.parseReserva(req.body);
                const result = await this.db.createReserva(reserva)
                res.json(reserva);
        
        }

        updateReserva = async (req, res) => {
                const reserva = this.helpers.parseReserva(req.body)
                const result = await this.db.updateReservas(reserva)
                res.json(result);
        }

        deleteReserva = async (req, res) => {
        const { reserva_id } = this.helpers.parseReserva
        const result = await this.db.deleteReserva(reserva_id)
        res.json(result)
        }
}

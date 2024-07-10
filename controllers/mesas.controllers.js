import MesasHelpers from '../helpers/mesas.helpers.js'
import MesasDaoMysql from './mesas.mysql.controllers.js'

export default class MesasControllers {

    constructor() {
    this.db = new MesasDaoMysql()
    this.helpers = new MesasHelpers()
    }

    getAllMesas = async (req, res) => {
        const mesas = await this.db.getAllMesas()
        res.json(mesas)
    }

    getMesaById = async (req, res) => {
        const { id } = req.params
        const mesa = await this.db.getMesaById(id)
            res.json(mesa)
    }

    createMesa = async (req, res) => {
        const mesa = await this.helpers.parseMesa(req.body)
        this.mesas.push(mesa)
        res.send('Mesa creada exitosamente');
    }

    updateMesa = (req, res) => {
        const { id } = req.params
        const mesaIndex = this.mesas.findIndex(mesa => mesa.id === parseInt(id))
        if (mesaIndex !== -1) {
            const updatedMesa = this.helpers.parseMesa(req.body)
            this.mesas[mesaIndex] = { ...this.mesas[mesaIndex], ...updatedMesa }
            res.send('Mesa actualizada exitosamente')
        } else {
            res.status(404).send('Mesa no encontrada')
        }
    }

    deleteMesa = (req, res) => {
        const { id } = req.params
        this.mesas = this.mesas.filter(mesa => mesa.id !== parseInt(id))
        res.send('Mesa eliminada exitosamente');
    }
}

import mesasMock from '../db/mocks/mesas.mock.js'
import MesasHelpers from '../helpers/mesas.helpers.js'

export default class MesasControllers {

    constructor() {
        this.mesas = mesasMock
        this.helpers = new MesasHelpers()
    }

    getAllMesas = (req, res) => {
        res.json(this.mesas)
    }

    getMesaById = (req, res) => {
        const { id } = req.params
        const mesa = this.mesas.find(mesa => mesa.id === parseInt(id))
        if (mesa) {
            res.json(mesa)
        } else {
            res.status(404).send('Mesa no encontrada')
        }
    }

    createMesa = (req, res) => {
        const mesa = this.helpers.parseMesa(req.body)
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

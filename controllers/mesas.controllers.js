import MesasDaoMysql from '../db/daos/mesas.dao.mysql.js'
import MesasHelpers from '../helpers/mesas.helpers.js'


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
        const { mesa_id } = req.params
        const mesa = await this.db.getMesaById(mesa_id)
        res.json(mesa)
    }

    createMesa = async (req, res) => {
        const mesa = this.helpers.parseMesa(req.body)
        const result = await this.db.createMesa(mesa)
        res.json(result);
    }

    updateMesas = async (req, res) => {
        const mesa = this.helpers.parseMesa(req.body)
        const result = await this.db.updateMesas(mesa)
        res.json(result);
    } 

    deleteMesa = async (req, res) => {
        const { mesa_id } = req.params
        const result = await this.db.deleteMesa(mesa_id)
        res.json(result)
    }
}

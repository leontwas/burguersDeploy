import ClientesDaoMysql from '../db/daos/clientes.dao.mysql.js'
import ClientesHelpers from '../helpers/clientes.helpers.js'

export default class ClientesControllers {

    constructor() {
        this.db = ClientesDaoMysql
        this.helpers = new ClientesHelpers()
    }

    getAllClientes =  async (req, res) => {
        const clientes = await this.db.getAllClientes()
        res.json(clientes)
    }

    getClienteById = async (req, res) => {
        const { cliente_id } = req.params
        const cliente = await this.db.getClienteById(cliente_id)
        res.json(cliente)
    }

    getClientesByEmail = async (req, res) => {
        const { email } = req.params
        const cliente = await this.db.getClientessByEmail(email)
        res.json(cliente)
    }

    getClientesByApellido = async (req, res) => {
        const { apellido } = req.params
        const cliente = await this.db.getClientesByApellido(apellido)
        res.json(cliente)
    }

    createCliente = async (req, res) => {
        const cliente = this.helpers.parseCliente(req.body)
        const result = await this.db.createCliente(cliente)
        res.json(result)
    }

    updateCliente = async (req, res) => {
        const cliente = this.helpers.parseCliente(req.body)
        const result = await this.db.updateCliente(cliente)
        res.json(result);
    } 

    deleteCliente = async (req, res) => {
        const { cliente_id } = this.helpers.parseCliente(req.body)
        const result = await this.db.deleteCliente(cliente_id)
        res.json(result)
    }
}

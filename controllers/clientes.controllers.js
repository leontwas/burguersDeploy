import clientesMock from '../db/mocks/clientes.mock.js'
import ClientesHelpers from '../helpers/clientes.helpers.js'

export default class ClientesControllers {

    constructor() {
        this.clientes = clientesMock
        this.helpers = new ClientesHelpers()
    }

    getAllClientes = (req, res) => {
        res.json(this.clientes)
    }

    getClienteById = (req, res) => {
        const { id } = req.params
        const cliente = this.clientes.find(cliente => cliente.cliente_id === parseInt(id))
        if (cliente) {
            res.json(cliente)
        } else {
            res.status(404).send('Cliente no encontrado')
        }
    }

    createCliente = (req, res) => {
        const cliente = this.helpers.parseCliente(req.body)
        this.clientes.push(cliente)
        res.send('Cliente creado exitosamente');
    }

    updateCliente = (req, res) => {
        const { id } = req.params
        const clienteIndex = this.clientes.findIndex(cliente => cliente.cliente_id === parseInt(id))
        if (clienteIndex !== -1) {
            const updatedCliente = this.helpers.parseCliente(req.body)
            this.clientes[clienteIndex] = { ...this.clientes[clienteIndex], ...updatedCliente }
            res.send('Cliente actualizado exitosamente')
        } else {
            res.status(404).send('Cliente no encontrado')
        }
    }

    deleteCliente = (req, res) => {
        const { id } = req.params
        this.clientes = this.clientes.filter(cliente => cliente.cliente_id !== parseInt(id))
        res.send('Cliente eliminado exitosamente');
    }
}

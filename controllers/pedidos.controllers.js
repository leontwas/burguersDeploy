export default class PedidosControllers {

    constructor(){

    }

    getAllPedidos = (req, res) => {
            res.send('get pedidos desde controllers');
        }

    createPedidos = (req, res) => {
        res.send('post pedidos desde controllers');
    } 
    
    updatePedidos = (req, res) => {
        res.send('put pedidos desde controllers');
    }

    deletePedidos = (req, res) => {
        res.send('delete pedidos desde controllers');
    }

}

export default class ProductosControllers {

    constructor(){

    }

    getAllProductos = (req, res) => {
            res.send('get productos desde controllers');
        }

    createProductos = (req, res) => {
        res.send('post productos desde controllers');
    } 
    
    updateProductos = (req, res) => {
        res.send('put productos desde controllers');
    }

    deleteProductos = (req, res) => {
        res.send('delete productos desde controllers');
    }

}

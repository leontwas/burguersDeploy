import ProductosDaoMysql from '../db/daos/productos.dao.mysql.js';
import ProductosHelpers from '../helpers/productos.helpers.js';

export default class ProductosControllers {

    constructor() {
        this.db = ProductosDaoMysql;
        this.helpers = new ProductosHelpers()
    }

    getAllProductos = async (req, res) => {
        const productos = await this.db.getAllProductos()
        res.json(productos)
    }

    getProductoById = async (req, res) => {
        const { producto_id } = req.params
        const producto = await this.db.getProductoById(producto_id)
        res.json(producto)
    }

    getProductosByNombre = async (req, res) => {
        const { nombre } = req.params;
        const productos = await this.productos.getProductosByNombre(nombre)
        res.json(productos)
    }

    getProductosByDescripcion = async (req, res) => {
        const { descripcion } = req.params;
        const productos = await this.productos.getProductosByDescripcion(descripcion)
        res.json(productos)
    }

    createProducto = async (req, res) => {
       producto = this.helpers.parseProducto(req.body);
       const result = await this.db.createProducto(producto)
       res.json(result)
    } 

    updateProducto = async (req, res) => {
        const producto = this.helpers.parseProducto(req.body);
        const result = await this.db.updateProducto(producto)
        res.json(result)
    }

    deleteProducto = async (req, res) => {
        const { producto_id } = this.helpers.parseProducto(req.body)
        const result = await this.db.deleteUsuarios(producto_id)
        res.json(result)
    }
}
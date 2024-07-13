import ProductosDaoMysql from '../db/daos/productos.dao.mysql.js';
import ProductosHelpers from '../helpers/productos.helpers.js';

export default class ProductosControllers {

    constructor() {
            this.db = ProductosDaoMysql;
            this.helpers = new ProductosHelpers()
        }

    getAllProductos = async (req, res) => {
        try {
            const productos = await this.db.getAllProductos()
            res.json(productos)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
        }

    getProductoById = async (req, res) => {
        try {
            const { producto_id } = req.params
            const producto = await this.db.getProductoById(producto_id)
        if (producto) {
            res.json(producto)
        } else {
            res.status(404).json({ error: 'Producto no encontrado' })
        }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
        }

    getProductosByNombre = async (req, res) => {
        try {
            const { nombre } = req.params;
            const productos = await this.productos.getProductosByNombre(nombre)
        if (productos) {
            res.json({ message: 'Producto borrado correctamente' })
            res.status(204).end()
        } else {
            res.status(404).json({ error: 'Producto no encontrado' })
        }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
        }

    getProductosByDescripcion = async (req, res) => {
        try {
            const { descripcion } = req.params;
            const productos = await this.productos.getProductosByDescripcion(descripcion)
        if (productos) {
            res.json(productos)
            res.status(204).end()
        } else {
            res.status(404).json({ error: 'Producto no encontrado' })
        }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
        }

    createProducto = async (req, res) => {
        try {
            producto = this.helpers.parseProducto(req.body);
            const result = await this.db.createProducto(producto)
            res.status(201).json(result)
        } catch (error) {
            res.status(500).json({ error: error.message })
          }
    } 

    updateProducto = async (req, res) => {
        try {
        const producto = this.helpers.parseProducto(req.body);
        const result = await this.db.updateProducto(producto)
        if (result) {
            res.json({ message: 'Producto modificado exitosamente' })
          } else {
            res.status(404).json({ error: 'Producto no encontrado' })
          }
        } catch (error) {
          res.status(500).json({ error: error.message })
        }
    }

    deleteProducto = async (req, res) => {
        try {
        const { producto_id } = this.helpers.parseProducto(req.body)
        const result = await this.db.deleteUsuarios(producto_id)
        if (result) {
            res.json({ message: 'Producto eliminado correctamente' })
            res.status(204).end()
          } else {
            res.status(404).json({ error: 'Producto not found' })
          }
        } catch (error) {
          res.status(500).json({ error: error.message })
        }
    }
}
import productsMock from '../mocks/products.mock.js';

export default class ProductsDaoMemory {
    constructor() {
        this.products = productsMock;
    }

    getAllProducts() {
        console.log('Productos encontrados:');
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === parseInt(id));
        console.log('Producto encontrado por Id:');
        return product;
    }

    getProductsByNombre(nombre) {
        const resultado = this.products.filter(product => product.nombre.toLowerCase() === nombre.toLowerCase());
        console.log('Productos encontrados por nombre:');
        return resultado;
    }

    createProduct(product) {
        this.products.push(product);
        console.log('Producto creado desde controllers');
        return true;
    }

    updateProduct(data) {
        let modProduct = null;
        this.products = this.products.map(product => {
            if (product.id === data.id) {
                product = data;
                modProduct = product;
            }
            return product;
        });
        console.log('Producto actualizado desde controllers');
        return modProduct;
    }

    deleteProduct(id) {
        const oldLength = this.products.length;
        this.products = this.products.filter(product => product.id !== parseInt(id));
        console.log('Producto eliminado desde controllers');
        return oldLength !== this.products.length;
    }
}

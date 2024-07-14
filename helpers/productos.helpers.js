export default class ProductosHelpers {
    parseProducto(data = {}) {
        return {
            producto_id: data.producto_id ? parseInt(data.producto_id) : null,
            nombre: data.nombre ? String(data.nombre) : '',
            descripcion: data.descripcion ? String(data.descripcion) : '',
            precio: data.precio ? parseFloat(data.precio) : 0.0,
            stock: data.stock ? parseInt(data.stock) : 0
        };
    }
}

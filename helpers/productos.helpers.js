export default class ProductosHelpers {
    parseProducto(data) {
        return {
            producto_id: parseInt(data.producto_id) || null,
            nombre: String(data.nombre) || '',
            descripcion: String(data.descripcion) || '',
            precio: parseFloat(data.precio) || 0.0,
            stock: parseInt(data.stock) || 0
        };
    }
}

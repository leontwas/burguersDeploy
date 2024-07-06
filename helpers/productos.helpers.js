export default class ProductosHelpers {
    parseProducto(data) {
        return {
            producto_id: parseInt(data.producto_id),
            nombre: String(data.nombre),
            descripcion: String(data.descripcion),
            precio: parseFloat(data.precio),
            stock: parseInt(data.stock)
        };
    }
}

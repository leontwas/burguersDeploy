document.addEventListener('DOMContentLoaded', () => {
    const agregarButton = document.querySelector('button[type="submit"]');
    const inputNombre = document.getElementById('nombre');
    const inputDescripcion = document.getElementById('descripcion');
    const inputPrecio = document.getElementById('precio');
    const inputStock = document.getElementById('stock');

    const agregarProductoHandleClick = (e) => {
        e.preventDefault();

        if (inputNombre.value.length === 0 ||
            inputDescripcion.value.length === 0 ||
            inputPrecio.value.length === 0 ||
            inputStock.value.length === 0) {

            return alert('Uno o más campos no se han completado');
        }

        const producto = {
            nombre: inputNombre.value,
            descripcion: inputDescripcion.value,
            precio: parseFloat(inputPrecio.value),
            stock: parseInt(inputStock.value)
        };

        const url = 'http://burguers-deploy.vercel.app/productos';

        fetch(url, {
            method: "POST",
            body: JSON.stringify(producto),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                alert(res.error);
            } else {
                alert('Producto agregado exitosamente');
                inputNombre.value = '';
                inputDescripcion.value = '';
                inputPrecio.value = '';
                inputStock.value = '';
            }
        })
        .catch(err => alert('Error al agregar el producto: ' + err));
    };
    
    agregarButton.addEventListener('click', agregarProductoHandleClick);
});

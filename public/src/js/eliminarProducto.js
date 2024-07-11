const deleteButton = document.getElementById('delete-button');
const deleteInput = document.getElementById('delete-id');

const deleteButtonHandleClick = (e) => {
    e.preventDefault();

    const { value } = deleteInput;

    if (value.length === 0) {
        return alert('Debe ingresar un valor');
    }

    const url = `../Routes/productos.routes/${value}`;

    fetch(url, { method: "DELETE" })
        .then(res => {
            if (!res.ok) {
                throw new Error('Error en la eliminación');
            }
            return res.json();
        })
        .then(res => errorCheck(res))
        .catch(err => alert(err.message));
};

const errorCheck = (res) => {
    if (res.error) {
        alert('Error: ' + res.error);
    } else {
        alert('Producto eliminado con éxito');
    }
};

deleteButton.addEventListener('click', deleteButtonHandleClick);
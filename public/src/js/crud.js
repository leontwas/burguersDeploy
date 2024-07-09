document.getElementById('registerClientForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('registerNombre').value;
    const apellido = document.getElementById('registerApellido').value;
    const direccion = document.getElementById('registerDireccion').value;
    const telefono = document.getElementById('registerTelefono').value;
    const email = document.getElementById('registerEmail').value;

    const response = await fetch('/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre,
            apellido,
            direccion,
            telefono,
            email
        })
    });

    const result = await response.json();
    alert('Cliente registrado: ' + JSON.stringify(result));
});

document.getElementById('createForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const clienteId = document.getElementById('createClienteId').value;
    const mesaId = document.getElementById('createMesaId').value;
    const fechaReserva = document.getElementById('createFechaReserva').value;

    const response = await fetch('/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            cliente_id: clienteId,
            mesa_id: mesaId,
            fecha_reserva: fechaReserva,
            estado: true
        })
    });

    const result = await response.json();
    alert('Reserva creada: ' + JSON.stringify(result));
});

document.getElementById('getForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const reservaId = document.getElementById('getReservaId').value;

    const response = await fetch(`/reservas/${reservaId}`);
    const result = await response.json();
    document.getElementById('getResult').textContent = JSON.stringify(result);
});

document.getElementById('updateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const reservaId = document.getElementById('updateReservaId').value;
    const clienteId = document.getElementById('updateClienteId').value;
    const mesaId = document.getElementById('updateMesaId').value;
    const fechaReserva = document.getElementById('updateFechaReserva').value;
    const estado = document.getElementById('updateEstado').checked;

    const response = await fetch(`/reservas/${reservaId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            cliente_id: clienteId || undefined,
            mesa_id: mesaId || undefined,
            fecha_reserva: fechaReserva || undefined,
            estado: estado
        })
    });

    const result = await response.json();
    alert('Reserva modificada: ' + JSON.stringify(result));
});

document.getElementById('deleteForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const reservaId = document.getElementById('deleteReservaId').value;

    const response = await fetch(`/reservas/${reservaId}`, {
        method: 'DELETE'
    });

    const result = await response.json();
    alert('Reserva eliminada: ' + JSON.stringify(result));
});

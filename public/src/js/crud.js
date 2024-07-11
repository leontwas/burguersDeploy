// Función para enviar el formulario de creación de reserva
$('#reservaForm').submit(function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Obtener datos del formulario
    let formData = {
        nombre: $('#nombre').val(),
        apellido: $('#apellido').val(),
        direccion: $('#direccion').val(),
        telefono: $('#telefono').val(),
        email: $('#email').val(),
        fechaReserva: $('#fechaReserva').val(),
        cantidadComensales: $('#cantidadComensales').val(),
        mesa: $('#mesa').val(),
        estado: $('#estado').is(':checked')
    };

    // Enviar solicitud POST al backend
    fetch('https://burguers-api.com/reservas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al crear reserva');
        }
        return response.json();
    })
    .then(data => {
        // Manejar la respuesta del backend si es necesario
        console.log('Reserva creada:', data);
        // Actualizar la tabla de reservas u otra lógica de interfaz
    })
    .catch(error => {
        console.error('Error:', error);
        // Manejar errores, mostrar mensajes al usuario, etc.
    });
});

// Función para enviar el formulario de cancelación de reserva
$('#cancelacionForm').submit(function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    let idReserva = $('#idReserva').val();

    // Enviar solicitud DELETE al backend
    fetch(`https://burguers-api.com/reservas/${idReserva}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cancelar reserva');
        }
        return response.json();
    })
    .then(data => {
        // Manejar la respuesta del backend si es necesario
        console.log('Reserva cancelada:', data);
        // Actualizar la tabla de reservas u otra lógica de interfaz
    })
    .catch(error => {
        console.error('Error:', error);
        // Manejar errores, mostrar mensajes al usuario, etc.
    });
});
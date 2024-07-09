$(document).ready(function() {
    // Llenar el select de cantidad de comensales
    for (let i = 1; i <= 20; i++) {
        $('#cantidadComensales').append(`<option value="${i}">${i}</option>`);
    }

    // Función para cargar mesas automáticamente según la cantidad de comensales
    $('#cantidadComensales').change(function() {
        let cantidad = $(this).val();
        // Lógica para asignar mesas según la cantidad de comensales
        let mesaAsignada = asignarMesa(cantidad);
        $('#mesa').val(mesaAsignada);
    });

    // Función para crear una reserva
    $('#reservaForm').submit(function(event) {
        event.preventDefault();
        let formData = {
            nombre: $('#nombre').val(),
            apellido: $('#apellido').val(),
            direccion: $('#direccion').val(),
            telefono: $('#telefono').val(),
            email: $('#email').val(),
            cantidadComensales: $('#cantidadComensales').val(),
            mesa: $('#mesa').val(),
            estado: $('#estado').prop('checked') ? true : false
        };

        // Lógica para validar los datos con validaciones.js

        // Lógica para enviar los datos al servidor usando AJAX (POST)
        $.ajax({
            type: 'POST',
            url: '/reservas',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function(response) {
                console.log('Reserva creada:', response);
                // Lógica para actualizar la tabla de reservas
                actualizarTablaReservas();
            },
            error: function(error) {
                console.error('Error al crear reserva:', error);
            }
        });
    });

    // Función para buscar reservas (GET)

    // Función para modificar una reserva (PUT)

    // Función para eliminar una reserva (DELETE)

    // Función para actualizar la tabla de reservas
    function actualizarTablaReservas() {
        $.get('/reservas', function(reservas) {
            $('#tablaReservasBody').empty();
            reservas.forEach(function(reserva) {
                $('#tablaReservasBody').append(`
                    <tr>
                        <td>${reserva.reserva_id}</td>
                        <td>${reserva.nombre}</td>
                        <td>${reserva.apellido}</td>
                        <td>${reserva.direccion}</td>
                        <td>${reserva.telefono}</td>
                        <td>${reserva.email}</td>
                        <td>${reserva.fecha_reserva}</td>
                        <td>${reserva.estado ? 'Activa' : 'Inactiva'}</td>
                        <td>
                            <button class="btn btn-sm btn-primary">Editar</button>
                            <button class="btn btn-sm btn-danger">Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        });
    }

    // Función para asignar mesa según la cantidad de comensales
    function asignarMesa(cantidad) {
        // Lógica para asignar mesas automáticamente
        return `Mesa ${Math.floor(Math.random() * 10) + 1}`;
    }

    // Cargar las reservas al cargar la página
    actualizarTablaReservas();
});

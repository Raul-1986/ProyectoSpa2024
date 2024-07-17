$(document).ready(function() {
    const modals = {
        turn: $('#turnModal'),
        service: $('#serviceModal'),
        professional: $('#professionalModal')
    };

    $('#newTurnBtn').on('click', function() {
        modals.turn.modal('show');
    });

    $('#addServiceBtn').on('click', function() {
        modals.service.modal('show');
    });

    $('#addProfessionalBtn').on('click', function() {
        modals.professional.modal('show');
    });

    $('#addServiceInProfessionalModalBtn').on('click', function() {
        modals.service.modal('show');
        
    });

    // Initialize calendar
    $('#calendar').fullCalendar({
        locale: 'es',
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        editable: false,
        events: []
    });

    // Add turn
    $('#turnForm').on('submit', function(e) {
        e.preventDefault();
        const service = $('#turnService').val();
        const professional = $('#turnProfessional').val();
        const date = $('#turnDate').val();
        const time = $('#turnTime').val();

        $.ajax({
            url: 'add_appointment.php',
            method: 'POST',
            data: {
                service: service,
                professional: professional,
                date: date,
                time: time
            },
            success: function(response) {
                alert('Turno reservado con éxito.');
                const event = {
                    title: `${service} - ${professional}`,
                    start: `${date}T${time}:00`,
                    service: service,
                    professional: professional
                };
                $('#calendar').fullCalendar('renderEvent', event, true);
                $('#turnForm')[0].reset();
            }
        });
    });

    // Add service
    $('#serviceForm').on('submit', function(e) {
        e.preventDefault();
        const serviceName = $('#serviceName').val();

        $.ajax({
            url: 'add_service.php',
            method: 'POST',
            data: {
                name: serviceName
            },
            success: function(response) {
                alert('Servicio agregado con éxito.');
                loadServices();
                $('#serviceForm')[0].reset();
            }
        });
    });

    // Add professional
    $('#professionalForm').on('submit', function(e) {
        e.preventDefault();
        const name = $('#professionalName').val();
        const phone = $('#professionalPhone').val();
        const profession = $('#professionalProfession').val();
        const services = $('#professionalServices').val();

        $.ajax({
            url: 'add_professional.php',
            method: 'POST',
            data: {
                name: name,
                phone: phone,
                profession: profession,
                services: services
            },
            success: function(response) {
                alert('Profesional agregado con éxito.');
                loadProfessionals();
                $('#professionalForm')[0].reset();
            }
        });
    });

    function loadServices() {
        $.ajax({
            url: 'get_services.php',
            method: 'GET',
            success: function(response) {
                const services = JSON.parse(response);
                let options = '';
                let rows = '';
                services.forEach(service => {
                    options += `<option value="${service.id}">${service.name}</option>`;
                    rows += `
                        <tr>
                            <td>${service.id}</td>
                            <td>${service.name}</td>
                            <td>
                                <button class="btn btn-sm btn-warning edit-service" data-id="${service.id}">Editar</button>
                                <button class="btn btn-sm btn-danger delete-service" data-id="${service.id}">Eliminar</button>
                            </td>
                        </tr>
                    `;
                });
                $('#turnService').html(options);
                $('#professionalServices').html(options);
                $('#serviceTable tbody').html(rows);
                $('#serviceTable').DataTable();
            }
        });
    }

    function loadProfessionals() {
        $.ajax({
            url: 'get_professionals.php',
            method: 'GET',
            success: function(response) {
                const professionals = JSON.parse(response);
                let rows = '';
                professionals.forEach(professional => {
                    rows += `
                        <tr>
                            <td>${professional.name}</td>
                            <td>${professional.phone}</td>
                            <td>${professional.profession}</td>
                            <td>
                                <button class="btn btn-sm btn-warning edit-professional" data-id="${professional.id}">Editar</button>
                                <button class="btn btn-sm btn-danger delete-professional" data-id="${professional.id}">Eliminar</button>
                            </td>
                        </tr>
                    `;
                });
                $('#professionalTable tbody').html(rows);
                $('#professionalTable').DataTable();
            }
        });
    }

    // Load initial data
    loadServices();
    loadProfessionals();

    // Handle edit and delete actions
    $(document).on('click', '.edit-service', function() {
        const id = $(this).data('id');
        // Implement edit functionality here
    });

    $(document).on('click', '.delete-service', function() {
        const id = $(this).data('id');
        if (confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
            $.ajax({
                url: 'delete_service.php',
                method: 'POST',
                data: { id: id },
                success: function(response) {
                    alert('Servicio eliminado con éxito.');
                    loadServices();
                }
            });
        }
    });

    $(document).on('click', '.edit-professional', function() {
        const id = $(this).data('id');
        // Implement edit functionality here
    });

    $(document).on('click', '.delete-professional', function() {
        const id = $(this).data('id');
        if (confirm('¿Estás seguro de que deseas eliminar este profesional?')) {
            $.ajax({
                url: 'delete_professional.php',
                method: 'POST',
                data: { id: id },
                success: function(response) {
                    alert('Profesional eliminado con éxito.');
                    loadProfessionals();
                }
            });
        }
    });
});


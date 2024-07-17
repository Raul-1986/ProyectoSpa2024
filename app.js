$(document).ready(function() {
    const events = [];
  
    // Initialize FullCalendar
    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      editable: false,
      events: events,
      eventClick: function(event) {
        alert(`Servicio: ${event.service}, Profesional: ${event.professional}, Fecha: ${event.start.format('YYYY-MM-DD')}, Hora: ${event.start.format('HH:mm')}`);
      }
    });
  
    // Modal logic
    const modals = {
      turn: $('#turnModal'),
      service: $('#serviceModal'),
      professional: $('#professionalModal')
    };
  
    $('.close').on('click', function() {
      $(this).closest('.modal').hide();
    });
  
    $('#newTurnBtn').on('click', function() {
      modals.turn.show();
    });
  
    $('#addServiceBtn').on('click', function() {
      modals.service.show();
    });
  
    $('#addProfessionalBtn').on('click', function() {
      modals.professional.show();
    });
  
    // Add turn
    $('#turnForm').on('submit', function(e) {
      e.preventDefault();
      const service = $('#turnService').val();
      const professional = $('#turnProfessional').val();
      const date = $('#turnDate').val();
      const time = $('#turnTime').val();
      const event = {
        title: `${service} - ${professional}`,
        start: `${date}T${time}:00`,
        service: service,
        professional: professional
      };
      events.push(event);
      $('#calendar').fullCalendar('renderEvent', event, true);
      alert('Turno reservado con éxito.');
      modals.turn.hide();
      this.reset();
    });
  
    // Add service
    $('#serviceForm').on('submit', function(e) {
      e.preventDefault();
      const serviceName = $('#serviceName').val();
      // Aquí puedes agregar la lógica para almacenar el servicio en la base de datos
      alert(`Servicio "${serviceName}" agregado con éxito.`);
      modals.service.hide();
      this.reset();
    });
  
    // Add professional
    $('#professionalForm').on('submit', function(e) {
      e.preventDefault();
      const professionalName = $('#professionalName').val();
      const professionalPhone = $('#professionalPhone').val();
      const professionalProfession = $('#professionalProfession').val();
      // Aquí puedes agregar la lógica para almacenar el profesional en la base de datos
      alert(`Profesional "${professionalName}" agregado con éxito.`);
      modals.professional.hide();
      this.reset();
    });
  });
  
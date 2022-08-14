jQuery(function($) {
$.datepicker.regional['es'] = 
  { 
    clearText: 'Borra', 
    clearStatus: 'Borra fecha actual', 
    closeText: 'Cerrar', 
    closeStatus: 'Cerrar sin guardar', 
    prevStatus: 'Mostrar mes anterior', 
    prevBigStatus: 'Mostrar a�o anterior', 
    nextStatus: 'Mostrar mes siguiente', 
    nextBigStatus: 'Mostrar a�o siguiente', 
    currentText: 'Hoy', 
    currentStatus: 'Mostrar mes actual', 
    monthNames:  ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'], 
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'], 
    monthStatus: 'Seleccionar otro mes', 
    yearStatus: 'Seleccionar otro a�o', 
    weekHeader: 'Sm', 
    weekStatus: 'Semana del a�o', 
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Mi�rcoles', 'Jueves', 'Viernes', 'S�bado'], 
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mi�', 'Jue', 'Vie', 'Sab'], 
    dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'], 
    dayStatus: 'Set DD as first week day', 
    dateStatus: 'Select D, M d', 
    dateFormat: 'dd/mm/yy', 
    firstDay: 1, 
    initStatus: 'Seleccionar fecha', 
    isRTL: false 
  }; 

  $.datepicker.setDefaults($.datepicker.regional['es']);
});
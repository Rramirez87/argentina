

$("#emisor_mensaje").attr('disabled', true);
$("#perfil_usuario").attr('disabled', true);

$('#modal_mensaje_usuario').on('hide.bs.modal', function () {
  $("#formulario_enviar_mensaje")[0].reset();
  $("#asunto_mensaje-error").remove();
  $("#texto_mensaje-error").remove();
  $("#error_mensaje").html("");
});

$('#modal_perfil_usuario').on('hide.bs.modal', function () {
  $("#formulario_perfil_usuario")[0].reset();
  $("#perfil_pass_actual-error").remove();
  $("#perfil_pass_nueva-error").remove();
  $("#perfil_pass_nueva2-error").remove();
  $("#error_password").html("");
});

$( "#formulario_enviar_mensaje" ).validate( {
              rules: {
                  asunto_mensaje: {
                      required: true,
                      //minlength: 4,
                      //maxlength: 50
                  },
                  orden_mensaje: {
                      required: true,
                      number: true,
                      min: 1
                  },
                  texto_mensaje: {
                      required: true,
                      minlength: 4,
                      maxlength: 200
                  },
              },
              messages: {
                  asunto_mensaje: {
                      required: "Por favor, indique asunto.",
                      //minlength: "Al menos 4 caracteres.",
                      //maxlength: "Menos de 50 caracteres."
                  },
                  orden_mensaje: {
                      required: "Por favor, indique número de orden.",
                      number: "Ingrese solo números",
                      min: "Número de orden inválido",

                  },
                  texto_mensaje: {
                      required: "Por favor, indique mensaje.",
                      minlength: "Al menos 4 caracteres.",
                      maxlength: "Menos de 200 caracteres."
                  },
              },
              errorElement: "em",
              errorPlacement: function ( error, element ) {
                  // Add the `help-block` class to the error element
                  error.addClass( "help-block" );
                  if ( element.prop( "type" ) === "checkbox" ) {
                      error.insertAfter( element.parent( "label" ) );
                  } else {
                      error.insertAfter( element );
                  }
              },
              highlight: function ( element, errorClass, validClass ) {
                  $( element ).parents( ".col-sm-5" ).addClass( "has-error" ).removeClass( "has-success" );
              },
              unhighlight: function ( element, errorClass, validClass ) {
                  $( element ).parents( ".col-sm-5" ).addClass( "has-success" ).removeClass( "has-error" );
              },
              submitHandler: function(form) {
                $("#emisor_mensaje").attr('disabled', false);
                $.ajax({
                    url: _URL.ajax() + "Mensajes/enviar",
                    type: "POST",
                    data: $(form).serialize(),
                    success: function(){

                      var texto = '<div class="alert alert-success alert-dismissible" role="alert">'+
                                        '<a class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></a>'+
                                        '<p class="text-center">Mensaje enviado correctamente.</p>'+
                                    '</div>';
                        $("#error_mensaje").html(texto).show("slow");

                        $("#formulario_enviar_mensaje")[0].reset();

                    },

                });
                $("#emisor_mensaje").attr('disabled', true);
              }

});

$( "#formulario_perfil_usuario" ).validate( {
              rules: {
                  perfil_pass_actual: {
                      required: true,
                      minlength: 4,
                      maxlength: 16
                  },
                  perfil_pass_nueva: {
                      required: true,
                      minlength: 4,
                      maxlength: 16
                  },
                  perfil_pass_nueva2: {
                      required: true,
                      equalTo: "#perfil_pass_nueva",
                      minlength: 4,
                      maxlength: 16
                  }
              },
              messages: {
                  perfil_pass_actual: {
                      required: "Por favor, ingrese contraseña.",
                      minlength: "Al menos 4 caracteres.",
                      maxlength: "Menos de 16 caracteres."
                  },
                  perfil_pass_nueva: {
                      required: "Por favor, ingrese contraseña.",
                      minlength: "Al menos 4 caracteres.",
                      maxlength: "Menos de 16 caracteres."
                  },
                  perfil_pass_nueva2: {
                      required: "Por favor, ingrese contraseña.",
                      equalTo: "Las contraseñas no coinciden",
                      minlength: "Al menos 4 caracteres.",
                      maxlength: "Menos de 16 caracteres."
                  }
              },
              errorElement: "em",
              errorPlacement: function ( error, element ) {
                  // Add the `help-block` class to the error element
                  error.addClass( "help-block" );
                  if ( element.prop( "type" ) === "checkbox" ) {
                      error.insertAfter( element.parent( "label" ) );
                  } else {
                      error.insertAfter( element );
                  }
              },
              highlight: function ( element, errorClass, validClass ) {
                  $( element ).parents( ".col-sm-5" ).addClass( "has-error" ).removeClass( "has-success" );
              },
              unhighlight: function ( element, errorClass, validClass ) {
                  $( element ).parents( ".col-sm-5" ).addClass( "has-success" ).removeClass( "has-error" );
              },
              submitHandler: function(form) {
                $("#perfil_usuario").attr('disabled', false);
                $.ajax({
                    url: _URL.ajax() + "User/cambio_pass",
                    type: "POST",
                    data: $(form).serialize(),
                    success: function(data){
                      if(data=="true"){

                        var texto = '<div class="alert alert-success alert-dismissible" role="alert">'+
                                        '<a class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></a>'+
                                        '<p class="text-center">Su contraseña ha sido cambiada correctamente.</p>'+
                                    '</div>';
                        $("#error_password").html(texto).show("slow");

                        $("#formulario_perfil_usuario")[0].reset();

                      }else{
                        var texto = '<div class="alert alert-danger alert-dismissible" role="alert">'+
                                        '<a class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></a>'+
                                        '<p class="text-center">Su contraseña no pudo ser cambiada.</p>'+
                                        '<p class="text-center">Por favor verifique su contraseña actual.</p>'+
                                    '</div>';
                        $("#error_password").html(texto).show("slow");
                      }


                    },

                });
                $("#perfil_usuario").attr('disabled', true);
              }

});

//accion cerrar sesion del usuario
$("#btn_cerrar_sesion").click(function(){
    document.location.href =  _URL.ajax() + "Index/salir";
});

function listarMensajes(){
    $.post( _URL.ajax() + "Mensajes/chequear", function(response){
    chequear_mensajes(response);
    });
}

//Inbox mensajes administradores
function chequear_mensajes(response) {

  var objeto = $.parseJSON(response);
  var id_mensaje,id_recurso, emisor, asunto, contenido, fecha;
  var contador = 0;
  $("#inbox_mensajes_pendientes").html("");

  for(var i in objeto) {

      fila = objeto[i];

      id_mensaje  = fila['ID_MENSAJE'];
      id_recurso  = fila['ID_RECURSO'];
      emisor      = fila['EMISOR'];
      asunto      = fila['ASUNTO'];
      contenido   = fila['CONTENIDO'];
      fecha       = fila['FECHA'];

      $("#inbox_mensajes_pendientes").append('<li class="'+id_mensaje+'"><a onclick="lectura_mensaje('+id_mensaje+'); return false;" href="#"><span class="label label-warning">'+fecha.substring(11,16)+ '</span> '+asunto+'</a></li>');

      contador = contador + 1;
  }

  $("#inbox_numero_mensajes").text(contador);


}

function lectura_mensaje(id){

  $.post( _URL.ajax() + "Mensajes/leer",{ id_mensaje:id }, function(response){
    poner_mensaje(response);
  });
  $("#error_inbox_lectura").html('');
  $("#modal_inbox_admin").modal('show');
}

function poner_mensaje(response) {

  var objeto = $.parseJSON(response);
  var id_mensaje, id_recurso,emisor, asunto, contenido, fecha;

  fila = objeto[0];

  id_mensaje  = fila['ID_MENSAJE'];
  id_recurso  = fila['ID_RECURSO'];
  emisor      = fila['EMISOR'];
  asunto      = fila['ASUNTO'];
  contenido   = fila['CONTENIDO'];
  fecha       = fila['FECHA'];

  $("#id_mensaje_lectura").val(id_mensaje);
  $("#orden_mensaje_lectura").val(id_recurso);
  $("#emisor_mensaje_lectura").val(emisor);
  $("#asunto_mensaje_lectura").val(asunto);
  $("#texto_mensaje_lectura").val(contenido);

}

function tarea_realizada(){

  var id = $("#id_mensaje_lectura").val();
  $.post( _URL.ajax() + "Mensajes/tareaRealizada",{ id_mensaje:id }, function(response){

    var texto = '<div class="alert alert-success alert-dismissible" role="alert">'+
                    '<a class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></a>'+
                    '<p class="text-center"><i class="fa fa-check-circle-o" aria-hidden="true"></i> Este mensaje se agendó como realizado.</p>'+
                '</div>';
    $("#error_inbox_lectura").html(texto).show("slow");

    var contador = $("#inbox_numero_mensajes").text();
    contador = parseInt(contador) - 1;
    $("#inbox_numero_mensajes").text(contador);

    $("#inbox_mensajes_pendientes").find('li.'+id).remove();
  });

}

function irAdmin(){
  location.href= _URL.ajax() + "admin/recursos";
  //window.open( _URL.ajax + 'admin/recursos','_blank');
}

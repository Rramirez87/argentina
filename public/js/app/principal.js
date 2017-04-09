var miTabla = "vacia";

$("#xProvincia").hide();
//$("#xDireccion").hide();
$("#xAvanzada").hide();
$("#xCoordenadas").hide();

//Llamada POST listado de municipios y manipulacion de SELECTS
$("#provincia").change(function(){

  var pro = $("#provincia").val()

  if(pro != null){
    if( pro.length != 0){
      var id_provincia = pro
      //if(id_provincia.length == 1 && id_provincia[0] == 2){
      if(id_provincia == 200){
        listarBarrios(id_provincia);

        document.getElementById("municipio").options.length=0;
        resetMunicipio()
        document.getElementById("localidad").options.length=0;
        resetLocalidad()

      }else{
        listarDepartamentos(id_provincia)
        // listarMunicipios(id_provincia);
        document.getElementById("localidad").options.length=0;
        resetLocalidad()
        document.getElementById("barrio").options.length=0;
        resetBarrio()

      }
    }else{


    }
  }else{
    document.getElementById("municipio").options.length=0;
    resetMunicipio()
    document.getElementById("localidad").options.length=0;
    resetLocalidad()
    document.getElementById("barrio").options.length=0;
    resetBarrio()
  }

});


$("#departamento").change(function(){

  var departamento = $("#departamento").val()
  var id_provincia = $("#provincia").val()
  listarMunicipios(id_provincia, departamento);
  if(departamento != null && id_provincia != 2){
     var id_provincia    = $("#provincia").val();
     var id_departamento    = $("#departamento").val();
     listarLocalidades(id_provincia, id_departamento);
  }else if(departamento != null && id_provincia == 2){
      listarBarrios(id_provincia,departamento,1);

      // document.getElementById("municipio").options.length=0;
      // resetMunicipio()
      document.getElementById("barrio").options.length=0;
      resetBarrio()


  }else{
    document.getElementById("localidad").options.length=0;
    resetLocalidad()
  }

});
//MANUPULACION MUNICIPIO
$("#municipio").change(function(){

  var muni = $("#municipio").val()

  if(muni != null){
     var id_provincia    = $("#provincia").val();
     var id_municipio    = $("#municipio").val();
     listarLocalidades(id_provincia, id_municipio);
  }else{
    document.getElementById("localidad").options.length=0;
    resetLocalidad()
  }

});


$("#localidad").change(function(){

  var localidad = $("#localidad").val()

  if(localidad != null){
     var id_provincia    = $("#provincia").val();
     var id_departamento    = $("#departamento").val();
     var id_localidad    = $("#localidad").val();
     listarBarrios(id_provincia, id_departamento,id_localidad);
  }else{
    //document.getElementById("localidad").options.length=0;
    //resetLocalidad()
  }

});




function clearProvincia(){
  $('#provincia').multiselect({
      includeSelectAllOption: false,
      enableFiltering: true,
      filterPlaceholder: 'Filtrar',
      enableCaseInsensitiveFiltering: true,
      buttonText: function(options, select) {
                    if (options.length === 0) {
                    return 'Provincias';
                    }
                    else {
                      var labels = [];
                      options.each(function() {
                       if ($(this).attr('label') !== undefined) {
                           labels.push($(this).attr('label'));
                       }
                       else {
                           labels.push($(this).html());
                       }
                      });
                      if(labels.length == 1){
                        return labels[0]
                      }else {
                        return labels.length + ' Provincias';
                      }

                    }
      },
      onInitialized: function(select, container) {
        listarDepartamentos(6);
      }

  });
}

function clearDepartamento(){
  $('#departamento').multiselect({
      includeSelectAllOption: false,
      enableFiltering: false,
      //filterPlaceholder: 'Filtrar',
      //enableCaseInsensitiveFiltering: true,
      buttonText: function(options, select) {
                    if (options.length === 0) {
                    return 'Depatamentos';
                    }
                    else {
                      var labels = [];
                      options.each(function() {
                       if ($(this).attr('label') !== undefined) {
                           labels.push($(this).attr('label'));
                       }
                       else {
                           labels.push($(this).html());
                       }
                      });
                      if(labels.length == 1){
                        return labels[0]
                      }else {
                        return labels.length + ' Departamentos';
                      }

                    }
      }
      // onInitialized: function(select, container) {
      //   listarMunicipios(6);
      // }

  });
}
function destroyDepartamento(){
  document.getElementById("departamento").options.length=0;
  $('#departamento').multiselect('destroy')
}

function resetDepartamento(){
  $('.departamento').show()
  $('#departamento').multiselect('destroy')
  setTimeout(function(){
    clearDepartamento()
    $('.departamento').hide()
  },1000)
}

function destroyMunicipio(){
  document.getElementById("municipio").options.length=0;
  $('#municipio').multiselect('destroy')
}
function clearMunicipio(){
  $('#municipio').multiselect({
      nonSelectedText: 'Seleccione Municipio',
      includeSelectAllOption: false,
      selectAllText: 'Todas',
      //enableFiltering: true,
      //filterPlaceholder: 'Filtrar',
      //enableCaseInsensitiveFiltering: true,
      onDropdownShow: function(event) {
        //$('#municipio').multiselect('refresh')
      },
      buttonText: function(options, select) {
                    if (options.length === 0) {
                    return 'Seleccione (opcional)';
                    }
                    else {
                      var labels = [];
                      options.each(function() {
                       if ($(this).attr('label') !== undefined) {
                           labels.push($(this).attr('label'));
                       }
                       else {
                           labels.push($(this).html());
                       }
                      });
                      if(labels.length == 1){
                        return labels[0]
                      }else {
                        return labels.length + ' Municipios';
                      }

                    }
      }

  })
}
function resetMunicipio(){
  $('.municipio').show()
  $('#municipio').multiselect('destroy')
  setTimeout(function(){
    clearMunicipio()
    $('.municipio').hide()
  },1000)
}
function clearLocalidad(){
  $('#localidad').multiselect({
      nonSelectedText: 'Seleccione Localidad',
      includeSelectAllOption: false,
      //selectAllText: 'Todas',
      //enableFiltering: true,
      //filterPlaceholder: 'Filtrar',
      //enableCaseInsensitiveFiltering: true,
      onDropdownShow: function(event) {
        //$('#localidad').multiselect('refresh')
      },
      buttonText: function(options, select) {
                    if (options.length === 0) {
                    return 'Seleccione (opcional)';
                    }
                    else {
                      var labels = [];
                      options.each(function() {
                       if ($(this).attr('label') !== undefined) {
                           labels.push($(this).attr('label'));
                       }
                       else {
                           labels.push($(this).html());
                       }
                      });
                      if(labels.length == 1){
                        return labels[0]
                      }else {
                        return labels.length + ' Localidades';
                      }

                    }
      }

  })
}
function resetLocalidad(){
  $('.localidad').show()
  $('#localidad').multiselect('destroy')
  setTimeout(function(){
    clearLocalidad()
    $('.localidad').hide()
  },1000)
}
function destroyLocalidad(){
  document.getElementById("localidad").options.length=0;
  $('#localidad').multiselect('destroy')
}
function clearBarrio(){
  $('#barrio').multiselect({
      nonSelectedText: 'Seleccione Barrio',
      includeSelectAllOption: false,
      //enableFiltering: false,
      //filterPlaceholder: 'Filtrar',
      //enableCaseInsensitiveFiltering: true,
      onDropdownShow: function(event) {
        $('#barrio').multiselect('refresh')
      },
      buttonText: function(options, select) {
                    if (options.length === 0) {
                    return 'Seleccione';
                    }
                    else {
                      var labels = [];
                      options.each(function() {
                       if ($(this).attr('label') !== undefined) {
                           labels.push($(this).attr('label'));
                       }
                       else {
                           labels.push($(this).html());
                       }
                      });
                      if(labels.length == 1){
                        return labels[0]
                      }else {
                        return labels.length + ' Barrios';
                      }

                    }
      }
      // onInitialized: function(select, container) {
      //   listarBarrios( $('#provincia').val() , $('#departamento').val(), $('#localidad').val() );
      // }

  })
}
function resetBarrio(){
  $('.barrio').show()
  $('#barrio').multiselect('destroy')
  setTimeout(function(){
    clearBarrio()
    $('.barrio').hide()
  },1000)
}
function destroyBarrio(){
  document.getElementById("barrio").options.length=0;
  $('#barrio').multiselect('destroy')
}



/**---------------------------------*/

(function(){
  $("#btn_xDireccion").on("click", function(){
    $("#xProvincia").hide("slow");
    $("#xCoordenadas").hide("slow");
    $("#xAvanzada").hide('slow');
    $("#xDireccion").show("slow");
    $('.tipo_opcion').html('BASE DE DATOS BAHRA')
  });

  $("#btn_xProvincia").on("click", function(){
    $("#provincia").attr("disabled", false);
    $("#xDireccion").hide("slow");
    $("#xCoordenadas").hide("slow");
    $("#xAvanzada").hide('slow');
    $("#xProvincia").show("slow");
    $('.tipo_opcion').html('BASE DE DATOS CNCPS')

  });

   $("#btn_xCoordenadas").on("click", function(){
    $("#xDireccion").hide("slow");
    $("#xProvincia").hide("slow");
    $("#xAvanzada").hide('slow');
    $("#xCoordenadas").show("slow");

  });

  $("#btn_xAvanzada").on("click", function(){
     $("#xDireccion").hide("slow");
     $("#xProvincia").hide("slow");
     $("#xCoordenadas").hide("slow");
     $("#xAvanzada").show("slow");
     $('.tipo_opcion').html('BASE DE DATOS SIEMPRO')

  });

})();


/***********************************************************************/

function provincias(){

  $.post( _URL.ajax() + "Recursos/listarProvincias", function(response){

    listarProvincias(response);
    clearProvincia()

  });

}
function listarProvincias(objeto) {

  if(objeto!="false"){

      var objetoProvincias = JSON.parse(objeto);
      var fila, id, provincia;

      for(var i in objetoProvincias) {

        fila = objetoProvincias[i];

        id        = fila["ID_PROVINCIA"];
        provincia = fila['PROVINCIA'];

        $('#provincia').append( '<option value="'+id+'">'+provincia+'</option>' );

      }

    }

}

function listarDepartamentos(id_provincia){

  if(id_provincia != "false"){
    $.post( _URL.ajax() + "Recursos/listarDepartamentos", { id_provincia: id_provincia} , function(response){
          dibujar_departamentos(response);
          resetDepartamento()
        });
  }

}
function dibujar_departamentos (objeto){

  document.getElementById("departamento").options.length=0;
  if( objeto!="false"){
      var objetoDepartamentos = JSON.parse(objeto);
      var fila, id, departamento;

      for(var i in objetoDepartamentos) {
        fila = objetoDepartamentos[i];
        id        = fila["ID_DEPARTAMENTO"];
        departamento = fila['DEPARTAMENTO'];
        $('#departamento').append( '<option value="'+id+'">'+departamento+'</option>' );
      }


    }

}






function listarMunicipios(id_provincia, id_departamento){

  if(id_provincia != "false"){
    $.post( _URL.ajax() + "Recursos/listarMunicipios", { id_provincia: id_provincia, id_departamento:id_departamento} , function(response){
          dibujar_municipios(response);
          resetMunicipio()
        });
  }

}
function dibujar_municipios (objeto){

  document.getElementById("municipio").options.length=0;
  if( objeto!="false"){
      var objetoMunicpios = JSON.parse(objeto);
      var fila, id, municipio;

      for(var i in objetoMunicpios) {
        fila = objetoMunicpios[i];
        id        = fila["ID_MUNICIPIO"];
        municipio = fila['MUNICIPIO'];
        $('#municipio').append( '<option value="'+id+'">'+municipio+'</option>' );
      }


    }

}
function listarLocalidades(id_provincia, id_departamento){

  if(id_departamento != "false"){
    $.post(_URL.ajax() + "Recursos/listarLocalidades", { id_provincia: id_provincia, id_departamento: id_departamento } , function(response){
          dibujar_localidades(response);
          resetLocalidad()
        });

  }

}
function dibujar_localidades (objeto){

  document.getElementById("localidad").options.length=0;
  if( objeto!="false"){

      var objetoLocalidades = JSON.parse(objeto);
      var fila, id, localidad;

      for(var i in objetoLocalidades) {

        fila = objetoLocalidades[i];

        id        = fila["ID_LOCALIDAD"];
        localidad = fila['LOCALIDAD'];

        $('#localidad').append( '<option value="'+id+'">'+localidad+'</option>' );

      }

    }

}
function listarBarrios(id_provincia, id_departamento, id_localidad){

  if(id_localidad != "false"){
    $.post(_URL.ajax() + "Recursos/listarBarrios", { id_provincia: id_provincia, id_departamento:id_departamento, id_localidad:id_localidad } , function(response){
          dibujar_barrios(response);
          resetBarrio()
        });

  }

}
function dibujar_barrios (objeto){

  document.getElementById("barrio").options.length=0;
  if( objeto!="false"){

      var objetoBarrios = JSON.parse(objeto);
      var fila, id, barrio;

      for(var i in objetoBarrios) {

        fila = objetoBarrios[i];

        id     = fila["ID_BARRIO"];
        barrio = fila['BARRIO'];

        $('#barrio').append( '<option value="'+id+'">'+barrio+'</option>' );

      }

    }

}

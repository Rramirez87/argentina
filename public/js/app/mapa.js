/*funciones auxiliar*/
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;

}

function limpiar_tabla() {

  //////
  $('#tabla_recursos').DataTable().clear().destroy();
  //////
  var inicio = 1;
  n = 0;
  var numero_filas = $('#body_tabla_recursos').children('tr').length;

  $('#tabla_recursos tr').each(function() {
     if (n >= inicio && n <= numero_filas){
        $(this).remove();
     }

    n++;
  });

}

function dibujar_checkbox(api) {

  $('#mostrar_checkbox').append('<li><a href="#" class="small" data-value="'+api+'" tabIndex="-1"><input type="checkbox"  />&nbsp;'+api+'</a></li>');

  //Menu para seleccionar apis en el mapa
  var opcionesMostrar = [];

  $( '#mostrar_checkbox a' ).on("click",function(event) {

    var $target = $( event.currentTarget ),
        val = $target.attr( 'data-value' ),
        $inp = $target.find( 'input' ),
        idx;


    if ( ( idx = opcionesMostrar.indexOf( val ) ) > -1 ) {
        opcionesMostrar.splice( idx, 1 );
        setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
        ocultar_markers(val);
    }else {
        opcionesMostrar.push( val );
        setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
        mostrar_markers(val);
    }

    $( event.target ).blur();

    console.log( "Mostrar/Ver: "+opcionesMostrar );

    return false;

  });

}

function resetarBusqueda() {
  $("#provincia").val("false");
  $("#municipio").val("false");
  $("#localidad").val("false");
  $("#barrio").val("false");
  $("#api").val('');
  $("#api").multiselect("refresh");
  $("#direccion").val("f");

}


/********************************
** CONFIGURACIONES GOOGLE MAPS **
*********************************
*********************************/


var localizador;
var map;
var mapaModal;
var marker;
var markerModal;
var i;
var apiRadio;
var contornoProvincia;


function crear_markers(id, api, institucion, direccion, url_icono, latitud, longitud,telefonos) {
//latitud, longitud, institucion, direccion, provincia, municipio, api, id, url_icono
  //var markersData = [];
  var i = {};

  i.lat  = parseFloat(latitud);
  i.lng  = parseFloat(longitud);
  i.institucion = institucion;
  i.direccion = direccion;
  i.api = api;
  i.id = id;
  i.url = url_icono;
  i.telefono = telefonos;

  markersData.push(i);

}

function mapaGoogle(lat,lon){
  map.setCenter(new google.maps.LatLng(lat, lon));
  map.setZoom(12)
}

function displayMarkers(){

   // this variable sets the map bounds and zoom level according to markers position
  var bounds = new google.maps.LatLngBounds();
  //displayMarkers();
  // For loop that runs through the info on markersData making it possible to createMarker function to create the markers
  for (var i = 0; i < markersData.length; i++){

    var latlng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);
    var institucion = markersData[i].institucion;
    var direccion = markersData[i].direccion;
    var api = markersData[i].api;
    var id = markersData[i].id;
    var url = markersData[i].url;
    var telefonos = markersData[i].telefono;

    createMarker(latlng, institucion, direccion ,api, id,url,telefonos);

    // Marker’s Lat. and Lng. values are added to bounds variable
    bounds.extend(latlng);
  }

   // Finally the bounds variable is used to set the map bounds
   // with API’s fitBounds() function
   map.fitBounds(bounds);
   //map.setZoom(14);

}

function createMarker(latlng, institucion, direcion ,api, id,url,telefonos){


  var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      title: api,
      icon:_URL.ajax()+url,
      id:id
   });

   // This event expects a click on a marker
   // When this event is fired the infowindow content is created
   // and the infowindow is opened
   google.maps.event.addListener(marker, 'click', function() {

      // Variable to define the HTML content to be inserted in the infowindow
      var iwContent = '<div id="iw-container>' +
                        //'<div class="iw-title" >Información Api</div>' +
                        '<div class="iw-content">' +
                             '<p><b>Institución:</b> '+institucion+'</p>'+
                             '<p><b>Dirección:</b> '+direcion+'</p>'+
                              '<p><b>Teléfono:</b> '+telefonos+'</p>'+
                             '<p><b>API:</b> '+api+'</p>'+
                             '<p><b>Orden:</b> '+id+'</p>'+
                         '</div>'+
                         //'<div class="iw-bottom-gradient"></div>' +
                     '</div>';

      // including content to the infowindow
      infoWindow.setContent(iwContent);

      // opening the infowindow in the current map and at the current marker location
      infoWindow.open(map, marker);
      /*Evento para filtrado de la tavla de resultados*/
      // miTabla.search( id + " " + institucion).draw();
      // $('#buscador_input').val(id + " " + institucion);
  });



  /////////////
  //google.maps.event.addListener(marker, 'mouseover', function() {
  //    infowindow.open(map,marker);
  //  });
  ///////////
  //marker.addListener("mouseover", function() {
  //    console.log(marker);
  //});
    //doble click para eliminar individlamete cada marker
  marker.addListener("dblclick", function() {
      //marker.setMap(null);
  });

  //array donde acumulo los markers para eliminar todos los markers
  markersArray.push(marker);

}

markersArray = [];//inicializo el array

function eliminar_todos_markers(){

  for(var i=0 ; i<markersArray.length; i++){
    markersArray[i].setMap(null);
  }
  markersArray= [];//vacio el array
  console.log("Markers eliminados: " + markersArray.length);


}

function ocultar_markers(valor){

  for(var i=0 ; i<markersArray.length; i++){
      if( markersArray[i].title == valor ){
        markersArray[i].setVisible(false);
      }
    }

}

function ocultarAllMarkers(){
  for(var i=0 ; i<markersArray.length; i++){
    markersArray[i].setVisible(false);
  }
}

function mostrar_markers(valor){

    for(var i=0 ; i<markersArray.length; i++){
      if( markersArray[i].title == valor ){
        markersArray[i].setVisible(true);
      }
    }

}

function initialize() {

  localizador = new google.maps.Geocoder();

  // PROPIEDADES DEL MAPA
  var mapOptions = {
                  center: new google.maps.LatLng(-38, -56),
                  zoom: 10,//???? no da bola
                  mapTypeId: 'roadmap',
                  zoomControl: true,
                  scaleControl: true,
                  scrollwheel: true,
                  disableDoubleClickZoom: false,
                  disableDefaultUI: false,
                  //mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  //opciones de zoom mapa
  /*
  zoomControl: false,
  scaleControl: false,
  scrollwheel: false,
  disableDoubleClickZoom: true,
  */

  //configuracion feografica para especificar la busqueda BOUNDS
  //var bounds = new google.maps.LatLngBounds();
  map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

  //mapaModal = new google.maps.Map(document.getElementById('map_canvas2'), mapOptions);

  infoWindow = new google.maps.InfoWindow();



   // evento de cerrar la info del marker
   google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
   });

  // inicializa el mapa con la posicion indicada por map
  var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(4);
        google.maps.event.removeListener(boundsListener);
  });


  //////BOTONES PERSONALIZADOS/////////////////////
  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(centerControlDiv);

  ////////////////////////////
  // Create the search box and link it to the UI element.
  //var input = document.getElementById('pac-input');
  /* new google.maps.LatLng(-34.63284, -58.57609));
  //new google.maps.LatLng(-33.8474, 151.2631));
  var input = document.getElementById('direccion');
  var searchBox = new google.maps.places.SearchBox(input, {
    bounds: defaultBounds
  });
  */
  var defaultBounds = new google.maps.LatLngBounds(//prioridad de prediccion de las siquientes zonas geograficas
      new google.maps.LatLng(-31.42008329999999, -64.18877609999998), //Cordoba
      new google.maps.LatLng(-31.7746654, -60.49564609999999),//entre rios
      new google.maps.LatLng(-32.9442426, -60.65053879999999), //Rosario
      new google.maps.LatLng(-34.9204948, -57.95356570000001) //bs as
  );


  var input = document.getElementById('direccion');
  var options = {
    bounds: defaultBounds,
    //types: ['(cities)'],
    componentRestrictions: {country: 'ar'}
  };

  var autocomplete = new google.maps.places.Autocomplete(input, options);


  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  /*
  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  //infpwondows
  var infowindow = new google.maps.InfoWindow();

  */

  /*
  //////
  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {

      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35)
      };

      var marker = new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        draggable: false,
        position: place.geometry.location,
        anchorPoint: new google.maps.Point(0, -29)

      });
      // Create a marker for each place.
      markers.push(marker);


      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
      console.log(place.geometry.location);
      ////////////////

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><p>' + address + '</p></div>');


    infowindow.open(map, marker);

      ///////////////
    });

    map.fitBounds(bounds);
    map.setZoom(7);

  });


  */


  ////////////////////////////
  //layer1.setMap(map);
  map.data.loadGeoJson( _URL.ajax() +'public/geojson/provincias.json' );
  map.data.setStyle({
  fillColor: '#000B94',
  fillOpacity: 0.0,
  strokeColor: 'red',
  strokeOpacity: 1.0,
  strokeWeight: 1

});

}

//IMPORTANTE INICIALIZA EL MAPA !!!!
google.maps.event.addDomListener(window, 'load', initialize);


//OJO VARIABLES GLOBALES
var infowindowCodeAddress = new google.maps.InfoWindow();
/////////////
function codeAddress() {

  borrarRario();
  var consulta = validar_xDireccion();

  if(consulta){
      //var infowindow = new google.maps.InfoWindow();
      localizador.geocode( { 'address': consulta.direccion}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
              map.setCenter(results[0].geometry.location);
              if(marker)
                  marker.setMap(null);

              marker = new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location,
                  animation: google.maps.Animation.DROP,//DROP o BOUNCE
                  draggable: false,
              });

              var info = '<div id="iw-container>' +
                                        '<div class="iw-title"><b>Usted ha buscado el siguiente punto de referencia:</b></div>' +
                                        '<div class="iw-content">' +
                                             '<p>'+consulta.direccion+'<br>'+
                                             '<b>Latitud:</b> '+results[0].geometry.location.lat()+'<br>'+
                                             '<b>Longitud:</b> '+results[0].geometry.location.lng()+'</p>'+
                                         '</div>'+
                                     '</div>';
              infowindowCodeAddress.setContent(info);

              google.maps.event.addListener(marker, 'click', function() {
                 infowindowCodeAddress.open(map,marker);

             });

            infowindowCodeAddress.open(map, marker);
            //var consulta;
            //consulta = validar_formulario_busqueda();
            //consulta              = validar_xDireccion();
            //if(consulta != false){
                consulta.latitud      = results[0].geometry.location.lat();
                consulta.longitud     = results[0].geometry.location.lng();
                //consulta.dependencia  = $('#dependencia1').val();
                consulta.tipoconsulta = 1;
                console.log(consulta);
                busqueda_recursos(consulta);

                map.setZoom(14);

            //}


          } else {
            //alert('Debe indicar una dirección válida');
            $.message({  content: '<i class="fa fa-exclamation" aria-hidden="true"></i> No ha ingresado una dirección válida', position: 'topright', color: 'cnm' });
          }


      });

  }else{
      //alert('Debe indicar una dirección válida');
      //$.message({  content: '<i class="fa fa-exclamation" aria-hidden="true"></i> Debe indicar una dirección o punto de referencia', position: 'topright', color: 'cnm' });
  }

}

function codeLatLng(latitud, longitud) {

  var infowindow = new google.maps.InfoWindow();
  var lat = parseFloat(latitud);
  var lng = parseFloat(longitud);
  var latlng = new google.maps.LatLng(lat, lng);

  localizador.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      map.setZoom(14);
      if (results[0]) {
        if(marker) marker.setMap(null);
        //marker.setMap(null);

        marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            animation: google.maps.Animation.DROP,//DROP o BOUNCE
            draggable: true
        });

        //infowindow.setContent(results[0].formatted_address);
        infowindow.setContent("Mueva el marker para visualizar las coordenadas");
        infowindow.open(map, marker);
        /*google.maps.event.addListener(marker, 'click', function(){
            infowindow.setContent("Mueva el marker para visualizar las coordenadas");
            infowindow.open(map, marker);
        });*/
        google.maps.event.addListener(marker, "dragend", function (evt) {
            //$("#latitud").val( marker.getPosition().lat().toFixed(6) );
            //$("#longitud").val( marker.getPosition().lng().toFixed(6) );
            infowindow.close();
            infoWindow.setOptions({
              content: '<p>Latitud: ' + evt.latLng.lat().toFixed(10) + '</p><p>Longitud: ' + evt.latLng.lng().toFixed(10) + '</p>'
            });
            infoWindow.open(map, marker);
        });
      } else {
        alert('Coordenas incorrectas');
      }
    } else {
      alert('Búsqueda fallida: Datos incorrectos');
    }
  });

}

//////////////////////////////////
function CenterControl(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.className = "btn-mapa";
  controlUI.title = 'Si elimina los markers tendrá que realizar nuevamente la búsqueda';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.className = "texto-mapa";
  controlText.innerHTML = 'Limpiar Mapa';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    //eliminar_todos_markers();
    ocultarAllMarkers()
    borrarPerimetro();
    borrarRario();

  });

}


/********************************autocompletar busqueda****************/
function informacion(data,id){

  // var fila = data.parentNode.parentNode.rowIndex;
  // var x = document.getElementById("tabla_recursos").rows[fila].cells;
  // var id_recurso = x[0].textContent;
  var ubicacion = busquedaIdMarker(id);
  markersArray[ubicacion].setVisible(true)
  google.maps.event.trigger(markersArray[ubicacion], 'click')
  map.setZoom(15);
}
function busquedaIdMarker(id){
  var x;
  for(var i in markersArray) {
      x   = markersArray[i];
      if(id == x["id"]){
        return i;
      }
  }
}
function dibujarPerimetro(provincia){

  borrarPerimetro();

  $.post(_URL.ajax() + "Recursos/listarCoordenadas",{ provincia:provincia }, function(objeto){

      if(objeto!="false"){

      var objetoCoordenadas = $.parseJSON(objeto);
      var fila, latitud, longitud;

      var provincia = [];

      for(var i in objetoCoordenadas) {

        fila = objetoCoordenadas[i];

        latitud   = fila["LATITUD"];
        longitud  = fila['LONGITUD'];

        provincia.push(new google.maps.LatLng(latitud,longitud));

      }

    }

    contornoProvincia = new google.maps.Polygon({
                                          clickable:false,
                                          paths: provincia,
                                          strokeColor: "#FF0000",
                                          strokeOpacity: 0.5,
                                          strokeWeight: 1.5,
                                          fillColor: "#A1A1A1",
                                          fillOpacity: 0.2
                                      });
    contornoProvincia.setMap(map);


  });
}
function borrarPerimetro(){

  if( !isEmpty(contornoProvincia) ){
    contornoProvincia.setMap(null);
  }
}
function borrarRario(){

  if( !isEmpty(apiRadio) ){
    apiRadio.setMap(null);
  }
}
function dibujarRadio(latitud,longitud,radio){

  apiRadio = new google.maps.Circle({
          clickable:false,
          strokeColor: '#FF0000',
          strokeOpacity: 0.5,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.1,
          //map: map,
          center: {lat:  latitud, lng: longitud},
          radius: radio * 1000 //en metros
        });

  apiRadio.setMap(map);
}
function busquedaxProvincia(){

  var consulta;
  if(marker) marker.setMap(null)
  consulta = validar_xProvincia();
  if(consulta != false){
      consulta.tipoconsulta = 2;
      dibujarPerimetro(consulta.provincia);
      console.log(consulta);
      busqueda_recursos(consulta);
  }

}
function busquedaxCoordenadas(){

  var consulta;
  if(marker) marker.setMap(null)
  consulta = validar_xCoordenadas();
  if(consulta != false){
      consulta.tipoconsulta = 3;
      console.log(consulta);
      codeLatLng(consulta.latitud, consulta.longitud);
      //dibujarPerimetro(consulta.provincia);
      busqueda_recursos(consulta);
  }

}
function ponerMarkerModal(latitud,longitud){
  if( !isEmpty(markerModal) ){
    markerModal.setMap(null);
  }
  //google.maps.event.trigger(mapaModal, "resize");
  var latlng = new google.maps.LatLng(latitud, longitud);
  markerModal = new google.maps.Marker({
      map: mapaModal,
      position: latlng,
      //title: api,
      //icon:"<?php echo URL; ?>"+url,
      //id:id
  });
  markerModal.setMap(mapaModal);
  mapaModal.setZoom(15);

  $('#modal_edicion_recurso').on('shown.bs.modal', function () {
          google.maps.event.trigger(mapaModal, "resize");
          mapaModal.setCenter(latlng);

      });
}

function limpiarPantalla(){
  $('#buscador_input').val('').attr('disabled', true);
  limpiar_tabla()
  eliminar_todos_markers()
  borrarPerimetro()
  borrarRario()
  if(marker) marker.setMap(null)

  $('#api').multiselect('selectAll', false)
  $('#api').multiselect('updateButtonText');
  $('#api2').multiselect('selectAll', false)
  $('#api2').multiselect('updateButtonText');
  $('#observacion').multiselect('deselectAll', false)
  $('#observacion').multiselect('updateButtonText');
  $('#municipio').multiselect('deselectAll', false)
  $('#municipio').multiselect('updateButtonText');
  $('#localidad').multiselect('deselectAll', false)
  $('#localidad').multiselect('updateButtonText');
  $('#barrio').multiselect('deselectAll', false)
  $('#barrio').multiselect('updateButtonText');

  $('#direccion').val('')
  $('#avanzada').val('')
  $('#latitud').val('')
  $('#longitud').val('')
  $("input[name='dependencia[]']").each(function (){
    //$(this).removeAttr('checked');
    $(this).prop('checked',true);
  });

}

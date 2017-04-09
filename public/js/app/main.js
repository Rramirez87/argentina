var _mapa;
var maxBoundsSouthWest = L.latLng(-89.99999999999994, -80.02985395599995),
    maxBoundsNorthEast = L.latLng(-17.786688039999945, -27.02314483699996),
    centerSouthWest = L.latLng(-56.5, -10.57812500000001),
    centerNorthEast = L.latLng(-19.642587534013032, -89.687500000000004),
    maxBounds = L.latLngBounds(maxBoundsSouthWest, maxBoundsNorthEast),
    centerBounds = L.latLngBounds(centerSouthWest, centerNorthEast),
    minZoom = 4,
    maxZoom = 15;


$(document).ready(function() {
    $('.municipio').hide()
    $('.localidad').hide()
    $('.barrio').hide()
    $('.avanzada').hide()
    clearMunicipio()
    clearLocalidad()
    clearBarrio()
    provincias()

    disabledBahra()


    /*Script base de datos bahra*/
    $.post( _URL.ajax() + "Recursos/provinciasBahra", function(response){
    	provinciasBahra(response);
      //console.log(response)
    });
    $.post( _URL.ajax() + "Recursos/tiposBahra", function(response){
    	tiposBahra(response);
      //console.log(response)
    });

    /*Script base de datos Siempro*/
    $.post( _URL.ajax() + "Recursos/provinciasSiempro", function(response){
    	provinciasSiempro(response);
      //console.log(response)
    });


    //app.init()


    _mapa = L.map('map');
    var base = L.tileLayer.wms('http://wms.ign.gob.ar/geoserver/wms?', {layers: 'ign:capabaseargenmap_gwc', attribution: '<a href="http://www.ign.gob.ar/">IGN</a>'});
    //base.addTo(_mapa);
    var layer;
    _mapa.setView([-38, -56], 4);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data &copy; OpenStreetMap contributors'
    }).addTo(_mapa);

    // layer = new L.TileLayer.Argenmap();
    //         map.addLayer(layer);

    var marker = L.marker([-34.6127236,-58.3794787]).addTo(_mapa);
    marker.bindPopup("<b>CNCPS</b><br>Consejo Nacional de Coordinación de Políticas Sociales").openPopup();
    // var popup = L.popup()
    // .setLatLng([-38, -57])
    // .setContent("I am a standalone popup.")
    // .openOn(map);


    var sidebar = L.control.sidebar('sidebar').addTo(_mapa);

    var controlLayers = L.control.layers().addTo(_mapa);

    var provincias_map =  _URL.ajax() +'public/geojson/provincias.json';
    var departamentos_map =  _URL.ajax() +'public/geojson/buenosaires.json';

    var geoJsonNacion =  _URL.ajax() +'public/geojson/provincias.json',
        geoJsonNacion1 =  _URL.ajax() +'public/geojson/nacion-simplified-1dotO-mapa.js',
        geoJsonProvincias = _URL.ajax() +'public/geojson/provincias-simplified-1dot5-mapa.js',
        geoJsonDepartamentos = _URL.ajax() +'public/geojson/departamentos-simplified-1dotO-mapa.js';

    //_mapa.fitBounds(centerBounds);
    _mapa.setMaxBounds(maxBounds);
    _mapa.setMinZoom(minZoom);
    _mapa.setMaxZoom(maxZoom);
$.getJSON(provincias_map, function (geojson) {
  var geojsonLayer = L.geoJson(geojson, {
    style: function (feature) {
      return {
        'weight': 1,
        'color': 'red',
        'fillOpacity': 0
      }
    }
  }).addTo(_mapa);
  controlLayers.addOverlay(geojsonLayer, 'Provicnias');
});

$.getJSON(departamentos_map, function (geojson) {
  //console.log(geojson.features[0].properties.DEPARTAMTO)
  var geojsonLayer = L.geoJson(geojson, {
    style: function (feature) {
      //console.log(feature.properties.DEPARTAMTO)
      //if(feature.properties.DEPARTAMTO == 'QUILMES'){
        return {
          'weight': 1,
          'color': 'blue',
          'fillOpacity': 0
        }
      //}

    }
  }).addTo(_mapa);
  controlLayers.addOverlay(geojsonLayer, 'Departamantos');
});




});

function disabledBahra(){
  $("#tipo_bahra").val("false");
  $("#tipo_bahra").attr("disabled", true);
  $("#departamento_bahra").val("false");
  $("#departamento_bahra").attr("disabled", true);
  $("#municipio_bahra").val("false");
  $("#municipio_bahra").attr("disabled", true);
  $("#localidad_bahra").val("false");
  $("#localidad_bahra").attr("disabled", true);
}



/*SCRIPT SELECT BAHRA*/
$("#provincia_bahra").change(function(){
  $("#municipio_bahra").val("false");
  $("#municipio_bahra").attr("disabled", true);
  $("#localidad_bahra").val("false");
  $("#localidad_bahra").attr("disabled", true);
  $("#barrio_bahra").val("false");
  $("#barrio_bahra").attr("disabled", true);
  if($("#provincia_bahra").val() != "false"){
    var id_provincia = $("#provincia_bahra").val();
    departamentosBahra(id_provincia);
    $("#departamento_bahra").attr("disabled",false);
    $('#tipo_bahra').val('false').attr("disabled",true)
  }else{
    disabledBahra()
  }
  if($("#provincia_bahra").val() == 2){
    $('#etiquetaLocalidadBahra').text('Barrios')
  }else{
    $('#etiquetaLocalidadBahra').text('Localidad')
  }
});


$("#departamento_bahra").change(function(){
  $("#municipio_bahra").val("false");
  $("#municipio_bahra").attr("disabled", true);
  if($("#departamento_bahra").val() != "false"){
    var id_provincia    = $("#provincia_bahra").val();
    var id_departamento    = $("#departamento_bahra").val();
    localidadesBahra(id_provincia, id_departamento);
    $("#localidad_bahra").attr("disabled",false);
    $('#tipo_bahra').val('false').attr("disabled",true)
  }
  if( $("#departamento_bahra").val() == "false"){
    $("#localidad_bahra").val("false");
    $("#localidad_bahra").attr("disabled", true);
    $("#municipio_bahra").val("false");
    $("#municipio_bahra").attr("disabled", true);
    $("#barrio_bahra").val("false");
    $("#barrio_bahra").attr("disabled", true);
    $('#tipo_bahra').val('false').attr("disabled",true)
  }

});

$("#localidad_bahra").change(function(e){
  if($('#localidad_bahra').val() == 'false'){
    $("#municipio_bahra").val("false");
    $("#municipio_bahra").attr("disabled", true);
  }
  $( "#localidad_bahra option:selected" ).each(function() {
    var lat = $( this ).data('latitud')
    var lon = $( this ).data('longitud')
    var codigoBahra = $( this ).data('cod_bahra')
    if(codigoBahra != undefined){
      municipiosBahra(codigoBahra)
      console.log(codigoBahra)
    }
    $('#tipo_bahra').val($( this ).data('bahra'))
   _mapa.setView([lat, lon], 12);
   mapaGoogle(lat,lon)
 });
});


/*DOM SIEMPRO*/
$("#provincia_siempro").change(function(){
  $("#municipio_siempro").val("false");
  $("#municipio_siempro").attr("disabled", true);
  $("#localidad_siempro").val("false");
  $("#localidad_siempro").attr("disabled", true);
  $("#barrio_siempro").val("false");
  $("#barrio_siempro").attr("disabled", true);
  if($("#provincia_siempro").val() != "false"){
    var id_provincia = $("#provincia_siempro").val();
    departamentosSiempro(id_provincia);
    $("#departamento_siempro").attr("disabled",false);
    $('#tipo_siempro').val('false').attr("disabled",true)
  }
});

$("#departamento_siempro").change(function(){
  if($("#departamento_siempro").val() != "false"){
    var id_provincia    = $("#provincia_siempro").val();
    var id_departamento    = $("#departamento_siempro").val();
    localidadesSiempro(id_provincia, id_departamento);
    $("#localidad_siempro").attr("disabled",false);
    $('#tipo_siempro').val('false').attr("disabled",true)
  }
  if( $("#departamento_siempro").val() == "false"){
    $("#localidad_siempro").val("false");
    $("#localidad_siempro").attr("disabled", true);
    $("#barrio_siempro").val("false");
    $("#barrio_siempro").attr("disabled", true);
    $('#tipo_siempro').val('false').attr("disabled",true)
  }

});

//Llamada POST listado de localidades y manipulacion de SELECTS
/*$("#municipio").change(function(){
  if($("#municipio").val() != "false"){
    var id_provincia    = $("#provincia").val();
    var id_municipio    = $("#municipio").val();
    listarLocalidades(id_provincia, id_municipio);
    $("#localidad").attr("disabled",false);
    $("#etiquetaLocalidad").text("Localidad*");
  }
  if( $("#municipio").val() == "false"){
    $("#localidad").val("false");
    $("#localidad").attr("disabled", true);
    $("#barrio").val("false");
    $("#barrio").attr("disabled", true);
  }

});*/

//Seleccione provincia - sino,  todo desabled
/*
*/



/*SCRIPT BAHRA*/

function tiposBahra(objeto) {
	if(objeto!="false"){
	    var objetoTipos = $.parseJSON(objeto);
	    var fila, id, tipo;
	    for(var i in objetoTipos) {
	      fila = objetoTipos[i];
	      id        = fila["CODIGO"];
	      tipo = fila['TIPO_BAHRA'];
	      $('#tipo_bahra').append( '<option value="'+id+'">'+tipo+'</option>' );
	    }
  	}
}
function provinciasBahra(objeto) {
	if(objeto!="false"){
	    var objetoProvincias = $.parseJSON(objeto);
	    var fila, id, provincia;
	    for(var i in objetoProvincias) {
	      fila = objetoProvincias[i];
	      id        = fila["ID"];
	      provincia = fila['PROVINCIA'];
	      $('#provincia_bahra').append( '<option value="'+id+'">'+provincia+'</option>' );
	    }
  	}
}

function departamentosBahra(id_provincia){
	if(id_provincia!="false"){
		$.post( _URL.ajax() + "Recursos/departamentosBahra", { id_provincia: id_provincia } , function(response){
      listarDepartamentosBahra(response);
    });
	}
}
function listarDepartamentosBahra (objeto){
	document.getElementById("departamento_bahra").options.length=1;
	if(objeto!="false"){
    var objetoDepartamentos = $.parseJSON(objeto);
    var fila, id, departamento;
    for(var i in objetoDepartamentos) {
      fila = objetoDepartamentos[i];
      id        = fila["ID"];
      departamento = fila['DEPARTAMENTO'];
      $('#departamento_bahra').append( '<option value="'+id+'">'+departamento+'</option>' );
    }
	}
}

function localidadesBahra(id_provincia, id_departamento){

	if(id_departamento != "false"){
		$.post(_URL.ajax() + "Recursos/localidadesBahra", { id_provincia: id_provincia, id_departamento: id_departamento } , function(response){
      listarLocalidadesBahra(response);
    });
	}
}
function listarLocalidadesBahra (objeto){
	document.getElementById("localidad_bahra").options.length=1;
	if( objeto!="false"){
    var objetoLocalidades = $.parseJSON(objeto);
    var fila, id, localidad,tipo,latitud,longitud,bahra,codigoBahra;
    for(var i in objetoLocalidades) {
      fila = objetoLocalidades[i];
      id        = fila["ID"];
      localidad = fila['LOCALIDAD'];
      latitud = fila['LATITUD']
      longitud = fila['LONGITUD']
      bahra = fila['TIPO']
      tipo = fila['TIPO_BAHRA']
      codigoBahra = fila['COD_BAHRA']

      $('#localidad_bahra').append( '<option data-cod_bahra="'+codigoBahra+'"   data-bahra = "'+bahra+'" data-latitud="'+latitud+'" data-longitud = "'+longitud+'" title="'+tipo+'" value="'+id+'">'+localidad+'</option>' );

    }
  }
}


function municipiosBahra(codigoBahra){
  if(codigoBahra != "false"){
		$.post(_URL.ajax() + "Recursos/municipioBahra", { codigo_bahra: codigoBahra } , function(response){
      listarMunicipioBahra(response);
    });
	}
}
function listarMunicipioBahra(objeto){
  document.getElementById("municipio_bahra").options.length=1;
  if( objeto!="false"){
    var objetoMunicpio = $.parseJSON(objeto);
    var fila, municpio, in1;
    for(var i in objetoMunicpio) {
      fila = objetoMunicpio[i];
      municipio = fila['FNA']
      in1 = fila['IN1']
      $('#municipio_bahra').append( '<option data-in1="'+in1+'" title="'+municpio+'" value="'+in1+'">'+municipio+'</option>' );
      $('#municipio_bahra').val(in1)
    }
  }
  if(objeto == 'false'){
    $('#municipio_bahra').append( '<option value="no">NO ESPECIFICADO</option>' );
    $('#municipio_bahra').val('no')
  }
}

/**/

/*Script Siempro*/
function provinciasSiempro(objeto) {
	if(objeto!="false"){
	    var objetoProvincias = $.parseJSON(objeto);
	    var fila, id, provincia;
	    for(var i in objetoProvincias) {
	      fila = objetoProvincias[i];
	      id        = fila["ID"];
	      provincia = fila['PROVINCIA'];
	      $('#provincia_siempro').append( '<option value="'+id+'">'+provincia+'</option>' );
	    }
  	}
}

function departamentosSiempro(id_provincia){
  if(id_provincia!="false"){
		$.post( _URL.ajax() + "Recursos/departamentosSiempro", { id_provincia: id_provincia } , function(response){
      listarDepartamentosSiempro(response);
    });
	}
}
function listarDepartamentosSiempro (objeto){
	document.getElementById("departamento_siempro").options.length=1;
	if(objeto!="false"){
    var objetoDepartamentos = $.parseJSON(objeto);
    var fila, id, departamento;
    for(var i in objetoDepartamentos) {
      fila = objetoDepartamentos[i];
      id        = fila["ID"];
      departamento = fila['DEPARTAMENTO'];
      $('#departamento_siempro').append( '<option value="'+id+'">'+departamento+'</option>' );
    }
	}
}
function localidadesSiempro(id_provincia, id_departamento){

	if(id_departamento != "false"){
		$.post(_URL.ajax() + "Recursos/localidadesSiempro", { id_provincia: id_provincia, id_departamento: id_departamento } , function(response){
      listarLocalidadesSiempro(response);
    });
	}
}
function listarLocalidadesSiempro (objeto){
	document.getElementById("localidad_siempro").options.length=1;
	if( objeto!="false"){
    var objetoLocalidades = $.parseJSON(objeto);
    var fila, id, localidad,tipo,latitud,longitud,bahra;
    for(var i in objetoLocalidades) {
      fila = objetoLocalidades[i];
      id        = fila["ID"];
      localidad = fila['LOCALIDAD'];
      latitud = fila['LATITUD']
      longitud = fila['LONGITUD']
      bahra = fila['TIPO']
      tipo = fila['TIPO_SIEMPRO']

      $('#localidad_siempro').append( '<option data-siempro = "'+bahra+'" data-latitud_siempro="'+latitud+'" data-longitud_siempro = "'+longitud+'" title="'+bahra+'" value="'+id+'">'+localidad+'</option>' );

    }
  }
}





/**/
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        //click: seleccionarPoligon
    });
}

function style(feature) {
return {
    fillColor: getColor(feature.properties.value, escalaColores),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
    };
}

function getColor(v, e=[]) {
    /* Color Scale */
    var colors = ['#d0d1e6', '#a6bddb', '#74a9cf', '#2b8cbe', '#045a8d'];

    if (v === undefined) {
        // color = '#dcdbdb';
        // color = '#ffffff';
        color = '#eeeeee';
    } else {
        color = v > e[4] ? colors[4] :
        color = v > e[3] ? colors[3] :
        color = v > e[2] ? colors[2] :
        color = v > e[1] ? colors[1] :
                           colors[0] ;
        // color = v > 80 ? '#045a8d' :
        //         v > 60 ? '#2b8cbe' :
        //         v > 40 ? '#74a9cf' :
        //         v > 20 ? '#a6bddb' :
        //                  '#d0d1e6' ;
    }
    return color;
}

function highlightFeature(event) {

        var layer = event.target;
        layer.setStyle({
            weight: 3,
            color: '#045a8d',
            dashArray: '',
            fillOpacity: 0.3
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }





}

function resetHighlight(event) {

        event.target.setStyle(style(event.target.feature));

}

function zoomIn(event) {
    if (ambitoIndicador == PROVINCIAL) {
        if (event.target.feature.properties.id == especialID) {
            tileBounds = especialCenterBounds;
        } else {
            tileBounds = event.target.getBounds();
        }
        map.fitBounds(tileBounds, {maxZoom: 5});
    } else /* ambitoIndicador == DEPARTAMENTAL */ {
        tileBounds = event.target.getBounds();
        map.fitBounds(tileBounds, {maxZoom: 6});
    }
}

function zoomOut() {
  map.fitBounds(centerBounds);
}

function seleccionarPoligon(event) {
    if (ambitoIndicador != NACIONAL) {
        if (isPoligonSelected) {
            isPoligonSelected = false;
            resetHighlight(selectedPoligonEvent);
            if (ambitoIndicador == PROVINCIAL) {
                zoomOut();
            }
        } else {
            isPoligonSelected = true;
            selectedPoligonEvent = event;
            zoomIn(event);
        }
    }
}

/**/






























app = {
    map: null,
    geojson: null,
    sidebar: null,


    init: function () {
        this.map = L.map('map_container')
            .setView(new L.LatLng(-38, -56), 4)
            .addLayer(this.createOSM());
        //this.sidebar = L.control.sidebar('sidebar').addTo(this.map);
        this.loadAllProvincias();
    },


    createOSM: function () {
        return new L.tileLayer('http://{s}tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="www.politicassociales.gob.ar" target="_blank">www.politicassociales.gob.ar</a>',
            maxZoom: 18,
            subdomains: ['a.', 'b.', 'c.', '']
        });
    },


    loadAllProvincias: function () {
        var _this = this;
        $.getJSON( _URL.ajax() + 'public/geojson/provincias.json', function(geoJsonData){
            _this.geojson = L.geoJson(geoJsonData, {
                //onEachFeature: app.loadProvincia,
                style: app.getStyle
            }).addTo(_this.map);
        })
    },


    loadProvincia: function (feature, layer) {
        layer.on({
            mouseover: app.highlightFeature,
            mouseout: app.resetHighlight,
            click: app.zoomToFeature
        });

        app.setMenuLink(feature.properties.provincia, layer);
    },

    getColor: function (id) {
    switch ( id % 5) {
        case 0: return '#D7191C';
        case 1: return '#FDAE61';
        case 2: return '#FFFFBF';
        case 3: return '#ABD9E9';
        case 4: return '#C7BB62';
    }
},

    getStyle: function (feature) {
        return {
            fillColor: '#D7191C',
            fillOpacity: 0.1,
            color: 'white',
            weight: 1.5,
            opacity: 0.8,
            dashArray: '3'
        };
    },


    highlightFeature: function (e) {
        var layer = e.target.feature ? e.target: $(this).data('layer');

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }
    },

    resetHighlight: function (e) {
        var layer = e.target.feature ? e.target: $(this).data('layer');
        //var layer = e.target;
        app.geojson.resetStyle(layer);
    },

    zoomToFeature: function (e) {
        var layer = e.target.feature ? e.target: $(this).data('layer');
        app.map.fitBounds(layer.getBounds());
        app.loadDepartamentos(layer.feature)
    },



    loadDepartamentos: function (feature) {
        var _this = this;
        $.getJSON('provincias/'+ feature.properties.provincia.toUpperCase() +'.json', function(geoJsonData){
            L.geoJson(geoJsonData).addTo(_this.map);
        })
    },

    setMenuLink: function (name, layer) {
        $.data($("#menu li a:contains('" + name.toUpperCase() + "')")[0], 'layer', layer);
    }
};

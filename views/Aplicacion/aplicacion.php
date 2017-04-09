<div class="container-fluid">

  <div class="panel panel-default">
    <div class="panel-heading">
      <div class="row">
        <div class="col-md-2">
          <div class="btn-group">
            <button type="button" disabled class="btn btn-default btn-sm btn-menu">OPCIONES</button>
            <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Opciones de búsqueda">
              <span class="caret"></span>
              <span class="sr-only">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu">

              <li><a href="#" onclick="return false;" id="btn_xDireccion"><i class="fa fa-street-view" aria-hidden="true"></i> BASE DE DATOS BAHRA</a></li>

            </ul>
          </div>

        </div>
        <label class="col-md-2 control-label tipo_opcion"for="">BASE DE DATOS BAHRA</label>
      </div>
    </div>
    <div class="panel-body">
      <form id="formulario_busqueda" action="" method="post" role="form" class="form-horizontal" role="form">
      <div id="xDireccion">
        <div class="form-group">

          <div class="col-xs-12 col-sm-12 col-md-2 warning">
            <label class="col-xs-12 col-sm-1 col-md-1 control-label" for="provincia_bahra">Provincia</label>
            <select class="form-control" id="provincia_bahra" name="provincia_bahra">
              <option value="false">SELECCIONE</option>

            </select>
          </div>


          <div class="col-xs-12 col-sm-12 col-md-2 warning">
            <label id="etiquetaDepa" class="col-xs-12 col-sm-1 col-md-1 control-label" for="departamento_bahra">Departamento</label>
            <select class="form-control" id="departamento_bahra" name="departamento_bahra">
              <option value="false">SELECCIONE</option>

            </select>
          </div>


          <div class="col-xs-12 col-sm-12 col-md-2 warning">
            <label id="etiquetaLocalidadBahra" class="col-xs-12 col-sm-1 col-md-1 control-label" for="localidad_bahra">Localidad</label>
            <select class="form-control" id="localidad_bahra" name="localidad_bahra">
              <option value="false">SELECCIONE</option>

            </select>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-2 warning">
            <label id="etiquetaMuni" class="col-xs-12 col-sm-1 col-md-1 control-label" for="municipio_bahra">Municipio</label>
            <select class="form-control" id="municipio_bahra" name="municipio_bahra">
              <option value="false">SELECCIONE</option>

            </select>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-2 warning">
            <label id="etiquetaLocalidad" class="col-xs-12 col-sm-2 col-md-7 control-label" for="tipo_bahra">Tipo Bahra</label>
            <select class="form-control" id="tipo_bahra" name="tipo_bahra">
              <option value="false">SELECCIONE</option>

            </select>
          </div>



        </div>
      </div>

      <div id="xProvincia">
        <div class="form-group sin-margin">



          <div class="col-md-2 ">
            <label class="titulo_select">PROVINCIA *</label>
            <select class="form-control input-sm text-capitalize" id="provincia" name="provincia" >
            </select>
          </div>

          <div class="col-md-2 ">
            <label class="titulo_select">DEPARTAMENTO/PARTIDO</label>
            <i class="fa fa-refresh fa-spin fa-1x fa-fw departamento"></i>
            <select class="form-control input-sm text-capitalize" id="departamento" name="departamento" >
            </select>
          </div>

          <div class="col-md-2">
            <label class="titulo_select">LOCALIDAD</label>
            <i class="fa fa-refresh fa-spin fa-1x fa-fw localidad"></i>
            <select class="form-control input-sm text-capitalize" id="localidad" name="localidad" >
            </select>
          </div>

          <div class="col-md-2">
            <label class="titulo_select">BARRIO</label>
            <i class="fa fa-refresh fa-spin fa-1x fa-fw barrio"></i>
            <select class="form-control input-sm text-capitalize" id="barrio" name="barrio" >
            </select>
          </div>

          <div class="col-md-2">
            <label class="titulo_select">MUNICIPIO</label>
            <i class="fa fa-refresh fa-spin fa-1x fa-fw municipio"></i>

            <select class="form-control input-sm text-capitalize" id="municipio" name="municipio" >
            </select>
          </div>





        </div>
      </div>


      </form>
    </div>
  </div>
</div>
<div class="container" >
  <div class="row" >

    <div class="col-md-12" id="map_canvas" style="width:100%;height:600px;"></div>
  </div>


</div>

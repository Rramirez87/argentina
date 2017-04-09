<?php
	ini_set("error_log", "/tmp/recursera.log");
	class RecursosModel extends Model {

		function __construct() {
			parent::__construct();
		}

    public function listarProvincias() {

      $atributos = "ID_PROVINCIA, UPPER(PROVINCIA) AS PROVINCIA";
      $tabla     = "PROVINCIA";
      $where     = 'PROVINCIA <> "TODO EL PAISS" ORDER BY PROVINCIA ASC';

      $respuesta = $this->db->select($atributos, $tabla ,$where);

      return $respuesta;
    }

		public function listarDepartamentos($id_provincia) {

      $atributos = "ID_DEPARTAMENTO, UPPER(DEPARTAMENTO) AS DEPARTAMENTO";
      $tabla     = "DEPARTAMENTOS";
      $where     = "ID_PROVINCIA IN (".$id_provincia.") ORDER BY DEPARTAMENTO ASC ";

      $respuesta = $this->db->select($atributos, $tabla ,$where);

      return $respuesta;
    }

    public function listarMunicipios($id_provincia, $id_departamento) {

      $atributos = "ID_MUNICIPIO, UPPER(MUNICIPIO) AS MUNICIPIO";
      $tabla     = "MUNICIPIOS";
      $where     = "ID_PROVINCIA IN (".$id_provincia.") AND ID_DEPARTAMENTO = ".$id_departamento." ORDER BY MUNICIPIO ASC";

      $respuesta = $this->db->select($atributos, $tabla ,$where);

      return $respuesta;
    }

    public function listarLocalidades($id_provincia,$id_departamento) {

      $atributos = "ID_LOCALIDAD, UPPER(LOCALIDAD) AS LOCALIDAD";
      $tabla     = "LOCALIDADES";
      $where     = "ID_PROVINCIA IN (".$id_provincia.") AND ID_DEPARTAMENTO IN (".$id_departamento.") ORDER BY LOCALIDAD ASC";

      $respuesta = $this->db->select($atributos, $tabla ,$where);

      return $respuesta;
    }

    public function listarBarrios($id_provincia,$id_departamento,$id_localidad) {

      $atributos = "ID_BARRIO, UPPER(BARRIO) AS BARRIO";
      $tabla     = "BARRIOS";
      $where     = "ID_PROVINCIA=".$id_provincia." AND ID_DEPARTAMENTO = ".$id_departamento." AND ID_LOCALIDAD = ".$id_localidad." ORDER BY BARRIO ASC";

      $respuesta = $this->db->select($atributos, $tabla ,$where);

      return $respuesta;
    }



    public function tiposBahra() {

      $atributos = "DISTINCT TIPO_BAHRA AS CODIGO,
                    CASE (tipo_bahra)
                    WHEN 'LS' THEN 'LOCALIDAD SIMPLE'
                    WHEN 'LC' THEN 'COMPONENTE DE LOCALIDAD COMPUESTA'
                    WHEN 'ST' THEN 'SITIO EDIFICADO'
                    WHEN 'LSE' THEN 'LOCALIDAD SIMPLE CON ENTIDAD'
                    WHEN 'LCE' THEN 'COMPONENTE DE LOCALIDAD COMPUESTA CON ENTIDAD'
                    WHEN 'E' THEN 'ENTIDAD'
                    END TIPO_BAHRA";
      $tabla     = "ARGENTINA.BAHRA";
      $order = " ORDER BY TIPO_BAHRA ASC";
      $where     = '';
      $respuesta = $this->db->select($atributos, $tabla.$order ,$where);
      return $respuesta;
    }

		public function provinciasBahra() {

      $atributos = "DISTINCT NOM_PROV AS PROVINCIA, COD_PROV AS ID";
      $tabla     = "ARGENTINA.BAHRA";
      $order = " ORDER BY NOM_PROV ASC";
      $where     = '';
      $respuesta = $this->db->select($atributos, $tabla.$order ,$where);
      return $respuesta;
    }

    public function departamentosBahra($id_provincia) {
      $atributos = "DISTINCT NOM_DEPTO AS DEPARTAMENTO, COD_DEPTO AS ID";
      $tabla     = "ARGENTINA.BAHRA";
      $where     = "COD_PROV = ".$id_provincia." ORDER BY NOM_DEPTO ASC ";
      $respuesta = $this->db->select($atributos, $tabla ,$where);
      return $respuesta;
    }

    public function localidadesBahra($id_provincia,$id_departamento) {
      $atributos = "COD_BAHRA,COD_LOC AS ID, NOMBRE_BAHRA AS LOCALIDAD, LAT_GD AS LATITUD , LONG_GD AS LONGITUD,TIPO_BAHRA AS TIPO,
      CASE (tipo_bahra)
      WHEN 'LS' THEN 'Localidad Simple'
      WHEN 'LC' THEN 'Componente de Localidad Compuesta'
      WHEN 'ST' THEN 'Sitio Edificado'
      WHEN 'LSE' THEN 'Localidad Simple con Entidad'
      WHEN 'LCE' THEN 'Componente de Localidad compuesta con Entidad'
      WHEN 'E' THEN 'Entidad'
      END TIPO_BAHRA";
      $tabla     = "ARGENTINA.BAHRA";
      $where     = "COD_PROV = (".$id_provincia.") AND COD_DEPTO = ".$id_departamento." ORDER BY NOMBRE_BAHRA ASC";

      $respuesta = $this->db->select($atributos, $tabla ,$where);

      return $respuesta;
    }

    public function municipioBahra($codigoBahra){
      $atributos = "UPPER(X.FNA) AS FNA, X.IN1";
      $tabla = "ARGENTINA.BAHRA_MUNICIPIOS X";
      $where = "X.IN1 = (SELECT Z.IN1 FROM ARGENTINA.BAHRA_REFERENCIA_MUNICIPIO Z WHERE Z.COD_BAHRA = ".$codigoBahra." ) ";
      $respuesta = $this->db->select($atributos,$tabla,$where);
      return $respuesta;
    }




	}
?>

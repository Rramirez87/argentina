<?php

	class Recursos extends Controller {

		function __construct() {
			parent::__construct();
		}


		public function listarProvincias() {

			if(isset($_POST)) {

				$respuesta = $this->model->listarProvincias();

				echo $this->magia($respuesta);

			} else{	echo "Error controlador Provincias"; }

		}

		public function listarDepartamentos() {

			if( isset($_POST['id_provincia']) ) {

				$id_provincia 	 = $_POST['id_provincia'];

        $id_provincia = ( is_array($id_provincia) ) ? implode(",", $id_provincia) : $id_provincia;

				$respuesta = $this->model->listarDepartamentos($id_provincia);

				echo $this->magia($respuesta);

			} else{	echo "Error controlador Departamentos"; }

		}


		public function listarMunicipios() {

			if( isset($_POST['id_provincia']) ) {

				$id_provincia 	 = $_POST['id_provincia'];
				$id_departamento 	 = $_POST['id_departamento'];

        $id_provincia = ( is_array($id_provincia) ) ? implode(",", $id_provincia) : $id_provincia;

				$respuesta = $this->model->listarMunicipios($id_provincia, $id_departamento);

				echo $this->magia($respuesta);

			} else{	echo "Error controlador Provincias"; }

		}

		public function listarLocalidades() {

			if( isset($_POST['id_provincia']) && isset($_POST['id_departamento']) ) {

        $id_provincia = $_POST['id_provincia'];
        $id_departamento = $_POST['id_departamento'];
				$id_provincia = ( is_array($id_provincia) ) ? implode(",", $id_provincia) : $id_provincia;
				$id_departamento = ( is_array($id_departamento) ) ? implode(",", $id_departamento) : $id_departamento;

				$respuesta = $this->model->listarLocalidades($id_provincia, $id_departamento);

				echo $this->magia($respuesta);

			} else{	echo "Error controlador Provincias"; }

		}

		public function listarBarrios() {

			if( isset($_POST['id_provincia']) ) {

        $id_provincia  = $_POST['id_provincia'];
				$id_departamento  = $_POST['id_departamento'];
				$id_localidad  = $_POST['id_localidad'];

        $id_provincia = ( is_array($id_provincia) ) ? implode(",", $id_provincia) : $id_provincia;

				$respuesta = $this->model->listarBarrios($id_provincia,$id_departamento,$id_localidad);

				echo $this->magia($respuesta);

			} else{	echo "Error controlador Provincias"; }

		}



		private function magia($array){

			if(count($array)>0){
					$contador = 0;
					$magia = "[ ";
					foreach ($array as $fila) {

							if($contador++>0){
								$magia.= ", ";
							}

							$fila  = array_map('utf8_encode',$fila);
							$fila = html_entity_decode(json_encode($fila));
							$magia.= " $fila ";
					}

		  			$magia.= " ]";

		  			return $magia;

				}else{

					return "false";
				}

		}


    public function tiposBahra(){
			if(isset($_POST)) {
				$respuesta = $this->model->tiposBahra();
				echo $this->magia($respuesta);
			} else{
				echo "Error controlador Provincias";
			}
		}
		public function provinciasBahra(){
			if(isset($_POST)) {
				$respuesta = $this->model->provinciasBahra();
				echo $this->magia($respuesta);
			} else{
				echo "Error controlador Provincias";
			}
		}

    public function departamentosBahra() {
			if( isset($_POST['id_provincia']) ) {
				$id_provincia 	 = $_POST['id_provincia'];
				$respuesta = $this->model->departamentosBahra($id_provincia);
				echo $this->magia($respuesta);
			} else{	echo "Error controlador Departamentos"; }
		}

    public function localidadesBahra() {
			if( isset($_POST['id_provincia']) && isset($_POST['id_departamento']) ) {
        $id_provincia = $_POST['id_provincia'];
        $id_departamento = $_POST['id_departamento'];
				$respuesta = $this->model->localidadesBahra($id_provincia, $id_departamento);
				echo $this->magia($respuesta);
			} else{	echo "Error controlador Provincias"; }

		}
		public function municipioBahra() {
			if( isset($_POST['codigo_bahra'])  ) {
        $codigoBahra = $_POST['codigo_bahra'];
				$respuesta = $this->model->municipioBahra($codigoBahra);
				echo $this->magia($respuesta);
			} else{	echo "Error controlador Provincias"; }

		}


?>

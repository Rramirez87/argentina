<?php
class Conection {

	private $link;

	public function __construct() {

		$init = require "./config/database.php";
		$host = $init['hostName'];
		$name = $init['DbName'];
		$user = $init['DbUser'];
		$pass = $init['DbPass'];

		$this->link = new mysqli($host, $user, $pass, $name);
		//$this->link->set_charset("utf8");
		if (mysqli_connect_errno()) {
			printf("Error de conxion: %s\n", mysqli_connect_error());
			exit();
		}
	}

	function __destruct() {

		$thread_id = $this->link->thread_id;
		$this->link->kill($thread_id);
		$this->link->close();
	}

	function select($attr,$table,$where = '') {

		$response = array();
		$where = ($where != '' ||  $where != null) ? "WHERE ".$where : '';
		$stmt = "SELECT ".$attr." FROM ".$table." ".$where.";";
		$result = $this->link->query($stmt) or die($this->link->error.__LINE__);
		if($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()){//$result->fetch_object()
                        $response[] = $row;

                    }
                    return $response;
		}
	}

	function selectTest($attr,$table,$where = '') {

		$response = array();
		$where = ($where != '' ||  $where != null) ? "WHERE ".$where : '';
		$stmt = "SELECT ".$attr." FROM ".$table." ".$where.";";
		mysqli_set_charset($this->link,"utf8");
		$result = $this->link->query($stmt) or die($this->link->error.__LINE__);
		//error_log(print_r($result,TRUE));
		if($result->num_rows > 0) {
			$response['success'] = true;
			$response['count'] = $result->num_rows;
			$response['data'] = array();
                    while($row = $result->fetch_object()){//$result->fetch_object()
                        $response['data'][] = $row;

                    }
                    return $response;
		}else {
			$response['success'] = false;
			$response['count'] = 0;

			return $response;
		}
	}

	function selectInner($attr,$table,$where = '') {

		$response = array();
		$where = ($where != '' ||  $where != null) ? "WHERE ".$where : '';
		$stmt = "SELECT ".$attr." FROM ".$table." INNER JOIN API ON RECURSOS.API = API.ID_API ".$where.";";
		$result = $this->link->query($stmt) or die($this->link->error.__LINE__);
		if($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()){
                        $response[] = $row;

                    }
                    return $response;
		}
	}

	function insert($table,$values,$where = '',$sanear = false) {

        $columnas = null;
        $valores = null;

		foreach ($values as $key => $value) {
			$columnas.=$key.',';
			if( $sanear == true){
				//$valores.='"'.ucwords(strtolower($value)).'",';
				$valores.='"'.utf8_decode($value).'",';

			}else{
				$valores.='"'.$value.'",';
			}
		}

		$columnas = substr($columnas, 0, -1);
		$valores = substr($valores, 0, -1);

		$stmt = "INSERT INTO ".$table." (".$columnas.") VALUES(".$valores.") ".$where.";";

        $resultado = $this->link->query($stmt); //or die($this->link->error);

        if(!$resultado){
        	$mensaje_error = $this->link->error;
        	error_log("Se produjo el siguiente error: ". $mensaje_error);
        	$array[] = "error";
        	return $array;
        }else{
	        $id = $this->link->insert_id;
	        $array[] = "ok";
	        $array[] = $id;

			return $array;
        }
	}

	function update($table,$values,$where) {
        $valores = null;
		foreach ($values as $key => $value) {
			$valores .= $key.'="'.utf8_decode($value).'",';
		}
		$valores = substr($valores,0,strlen($valores)-1);
		$stmt = "UPDATE $table SET $valores WHERE $where";
		$result = $this->link->query($stmt) or die($this->link->error.__LINE__);
		if($result){
			return true;
		}else {
			return false;
		}

	}

	function delete($table,$values,$complex = false) {

		if($complex){ $where = $values; }else{
			foreach ($values as $key => $value) {
				$where = $key.'="'.$value.'"';
			}
		}
		$stmt = 'DELETE FROM '.$table.' WHERE '.$where;
		$result = $this->link->query($stmt) or die($this->link->error.__LINE__);
		if($result->num_rows > 0) {
			$response = false;
		}
		else {
			$response = true;
		}
		return $response;
	}

	function check($what,$table,$values,$complex = false) {

		if($complex){ $where = $values; }else{
			foreach ($values as $key => $value) {
				$where = $key.'="'.$value.'"';
			}
		}
		$stmt = "SELECT ".$what." FROM ".$table." WHERE ".$where;
		$result = $this->link->query($stmt) or die($this->link->error.__LINE__);
		if($result->num_rows > 0) {
			$response = true;
		}
		else {
			$response = false;
		}
		return $response;
	}
}
?>

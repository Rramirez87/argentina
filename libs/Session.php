<?php

class Session {

	static function init($lifetime = 3600, $path = "/", $domain = URL, $secure = false, $httpponly = true) {
		ini_set('session.gc_maxlifetime', $lifetime);//1hora
		@session_set_cookie_params ($lifetime);
		@session_name(PROJECT);
		@session_start();
		@session_regenerate_id();
	}

	static function destroy() {

		session_destroy();

	}

	static function getValue($clave) {

		return isset($_SESSION[$clave]) ? $_SESSION[$clave] : false;

	}

	static function setValue($clave, $valor) {

		$_SESSION[$clave] = $valor;

	}

	static function unsetValue($clave) {

		if (isset($_SESSION[$clave])) {

			unset($_SESSION[$clave]);

		}else {

			//die("SESSION[$clave] no exsite!");

		}

	}

	static function exist() {

		return isset($_SESSION['perfil']) ? true : false;

	}

	static function fecha() {

    $fecha 	= date('Y-m-d');
      $n_dia	= date('N');
      $n_mes	= date('n');
      $dias = array('', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo');
      $meses = array('', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
      $fechaFormato = $dias[$n_dia].', '.date('d').' de '.$meses[$n_mes].' de '.date('Y');

      return  $fechaFormato;

    }
}
?>

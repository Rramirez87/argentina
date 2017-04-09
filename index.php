<?php

/*
 * Controlador principal para un modelo MVC adaptable a cualquier proyecto PHP
 * Capturando las peticiones por uri => CONTROLADOR/METODO/PARAMETROS.
 *
 * @autor  Ricardo Ramirez
 * @update 30/07/2016 - Incorpora vue.js
 *
 */
ini_set("error_log", "./tmp/argentina.log");
define ('PROYECTO', __DIR__);

require_once './config/config.php';

$url = isset($_GET['url']) ? $_GET['url'] : 'Index/index';
$url = explode("/", $url);

if(isset($url[0])) { $controller = $url[0]; }
if(isset($url[1])) { if($url!='') { $method=$url[1]; } }
if(isset($url[2])) { if($url!='') { $params=$url[2]; } }


spl_autoload_register(function($class){
	if( file_exists(LIBS . $class . ".php") ) {
		require LIBS . $class . ".php";
	}elseif( file_exists( MODELS . $class . ".php") ){
    require MODELS . $class . ".php";
  }else{
    exit("La clase " . $class . " no ha sido definida!!");
  }
});

$controller = ucwords($controller);

$ruta = './controllers/' . $controller . '.php';

if(file_exists($ruta)){
	require $ruta;
	$controller = new $controller();

	if(isset($method) && $method!=""){
		if(method_exists($controller, $method)){
			if(isset($params) ){
				$controller->{$method}($params);
			}else{
				$controller->{$method}();
			}
		}else{
			die("Error URL");
		}
	}else{
		if(method_exists($controller, "index")){
			$controller->index();
		}
	}
}else{
	die("Error URL");
}

?>

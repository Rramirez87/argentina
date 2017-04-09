<?php

class View {

  public $parametros;

  public function setParametros($parametros = null){
    if(!is_null($parametros)){
      $this->parametros = $parametros;
    }
  }

	function render($folder, $view, $info = null) {

		require './views/' . $folder . '/'. $view . '.php';

	}

}

?>

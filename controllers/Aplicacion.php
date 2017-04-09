<?php

class Aplicacion extends Controller {

	function __construct() {
		parent::__construct();
	}

	public function index() {

    $this->view->render('Includ', 'head');

		$this->view->render('Aplicacion', 'aplicacion');

		$this->view->render('Includ', 'footer');

	}

}

?>

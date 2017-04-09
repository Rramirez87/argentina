<?php

class Index extends Controller {

	function __construct() {
		parent::__construct();
	}

	public function index() {

    $this->view->render('Includ', 'head');

    $this->view->render('Includ', 'nav');

    $this->view->render('Includ', 'header');

		$this->view->render('Index', 'index');

		$this->view->render('Includ', 'footer');

	}

}

?>

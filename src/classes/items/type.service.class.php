<?php
/**
* @package janitor.itemtypes
* This file contains itemtype functionality
*/

class TypeService extends Itemtype {

	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		// construct ItemType before adding to model
		parent::__construct(get_class());


		// itemtype database
		$this->db = SITE_DB.".item_service";


		// Name
		$this->addToModel("name", array(
			"type" => "string",
			"label" => "Service name",
			"required" => true,
			"hint_message" => "Name of the service", 
			"error_message" => "Name must be filled out."
		));

		// Class
		$this->addToModel("classname", array(
			"type" => "string",
			"label" => "CSS Class for list",
			"hint_message" => "If you don't know what this is, just leave it empty"
		));

		// description
		$this->addToModel("description", array(
			"type" => "text",
			"label" => "Short description",
			"hint_message" => "Write a short description of the article",
			"error_message" => "A short description without any words? How weird."
		));

		// HTML
		$this->addToModel("html", array(
			"hint_message" => "Write your article",
			"allowed_tags" => "p,h2,h3,h4,ul,ol,download,jpg,png,code"
		));

	}

}

?>
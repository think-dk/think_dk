<?php
/**
* @package janitor.itemtypes
* This file contains itemtype functionality
*/

class TypeTarget extends Itemtype {

	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		// construct ItemType before adding to model
		parent::__construct(get_class());


		// itemtype database
		$this->db = SITE_DB.".item_target";


		// Name
		$this->addToModel("name", array(
			"type" => "string",
			"label" => "Topic",
			"required" => true,
			"hint_message" => "Name of target", 
			"error_message" => "Name must be filled out."
		));

		// Description
		$this->addToModel("description", array(
			"type" => "text",
			"label" => "Short description",
			"hint_message" => "Write a short description of the target",
			"error_message" => "A short description without any words? How weird."
		));

	}

}

?>
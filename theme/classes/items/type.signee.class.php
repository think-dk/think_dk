<?php
/**
* @package janitor.itemtypes
* This file contains itemtype functionality
*/

class TypeSignee extends Itemtype {


	public $db;


	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		// construct ItemType before adding to model
		parent::__construct(get_class());


		// itemtype database
		$this->db = SITE_DB.".item_signee";


		// Name
		$this->addToModel("name", array(
			"type" => "string",
			"label" => "Ticket name",
			"required" => true,
			"hint_message" => "Name of the ticket.", 
			"error_message" => "Name must be filled out."
		));

		// fullname
		$this->addToModel("fullname", array(
			"type" => "string",
			"label" => "Full name",
			"required" => true,
			"hint_message" => "Write your full name.",
			"error_message" => "Your full name cannot be empty."
		));

		// fullname
		$this->addToModel("fullname", array(
			"type" => "string",
			"label" => "Full name",
			"required" => true,
			"hint_message" => "Write your full name.",
			"error_message" => "Your full name cannot be empty."
		));

		// email
		$this->addToModel("email", array(
			"type" => "email",
			"label" => "Email",
			"required" => true,
			"hint_message" => "Write your email.",
			"error_message" => "Your email must be a valid email."
		));
		
		// signed item
		$this->addToModel("signed_item_id", array(
			"type" => "item_id",
			"label" => "Signed item",
			"required" => true,
			"hint_message" => "Signed item.",
			"error_message" => "Invalid."
		));

	}

}

?>
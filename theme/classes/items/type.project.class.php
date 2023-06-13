<?php
/**
* @package janitor.itemtypes
* This file contains itemtype functionality
*/

class TypeProject extends Itemtype {


	public $db;


	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		// construct ItemType before adding to model
		parent::__construct(get_class());


		// itemtype database
		$this->db = SITE_DB.".item_project";


		// Name
		$this->addToModel("name", array(
			"type" => "string",
			"label" => "Project name",
			"required" => true,
			"hint_message" => "Name of the project.", 
			"error_message" => "Name must be filled out."
		));

		// Class
		$this->addToModel("classname", array(
			"type" => "string",
			"label" => "CSS Class for list",
			"hint_message" => "CSS class for custom styling. If you don't know what this is, just leave it empty.",
			"error_message" => "Classname is invalid.",
		));

		// description
		$this->addToModel("description", array(
			"type" => "text",
			"label" => "Short SEO description",
			"max" => 155,
			"hint_message" => "Write a short description of the project for SEO and listings.",
			"error_message" => "Your project needs a description – max 155 characters."
		));

		// HTML
		$this->addToModel("html", array(
			"type" => "html",
			"label" => "Full description",
			"allowed_tags" => "p,h2,h3,h4,ul,ol,download,jpg,png,code",
			"hint_message" => "Describe the project.",
			"error_message" => "A project description without any words? How weird."
		));

		// Project details
		$this->addToModel("projectdetails", array(
			"type" => "html",
			"label" => "Project details",
			"allowed_tags" => "p,h2,h3,h4,ul,ol,download,jpg,png,code",
			"hint_message" => "List of project details – status of project and who to contact.",
			"error_message" => "No project details? How weird."
		));

		// Single media
		$this->addToModel("single_media", array(
			"type" => "files",
			"label" => "Add media here",
			"max" => 1,
			"allowed_formats" => "png,jpg",
			"hint_message" => "Add single image by dragging it here. PNG or JPG allowed.",
			"error_message" => "Media does not fit requirements."
		));

	}

}

?>
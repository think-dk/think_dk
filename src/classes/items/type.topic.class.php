<?php
/**
* @package janitor.itemtypes
* This file contains itemtype functionality
*/

class TypeTopic extends Itemtype {

	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		// construct ItemType before adding to model
		parent::__construct(get_class());


		// itemtype database
		$this->db = SITE_DB.".item_topic";


		// Name
		$this->addToModel("name", array(
			"type" => "string",
			"label" => "Topic",
			"required" => true,
			"hint_message" => "Headline of the topic", 
			"error_message" => "Headline must be filled out."
		));

		// Description
		$this->addToModel("description", array(
			"type" => "text",
			"label" => "Short description",
			"hint_message" => "Write a short description of the topic",
			"error_message" => "A short description without any words? How weird."
		));


		// Problem headline
		$this->addToModel("problem_headline", array(
			"type" => "string",
			"label" => "Problem headline",
			"hint_message" => "Problem headline of the topic", 
			"error_message" => "Problem headline contains illigal characters."
		));

		// Problem
		$this->addToModel("problem", array(
			"type" => "html",
			"label" => "Problem description",
			"hint_message" => "Write a short description of the problem",
			"error_message" => "A short description without any words? How weird.",
			"allowed_tags" => "p"
		));

		// Solution
		$this->addToModel("solution", array(
			"type" => "html",
			"label" => "Solution description",
			"hint_message" => "Write a description of the solution",
			"error_message" => "A description without any words? How weird.",
			"allowed_tags" => "p,h3,ol,ul"
		));

		// Details
		$this->addToModel("details", array(
			"type" => "html",
			"label" => "Solution details",
			"hint_message" => "Explain the details of the solution",
			"error_message" => "An explanation without any words? How weird.",
			"allowed_tags" => "p,h3,ol,ul"
		));

	}

}

?>
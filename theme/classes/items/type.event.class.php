<?php
/**
* @package janitor.items
* This file contains item type functionality
*/

class TypeEvent extends TypeEventCore {

	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		parent::__construct(get_class());


	}

	function saveAdmin($action) {
		$result = $this->save($action);
		
		// Add tags if this is a memberevent
		$type = getPost("memberevent");
		if($result && $type) {

			$_POST["tags"] = "eventtype:member";
			$this->addTag(["addTag", $result["id"]]);

		}
		
		return $result;
	}

	function updateAdmin($action) {
		return $this->update($action);
	}

	function updateHost($action) {
		return $this->update($action);
	}

}

?>
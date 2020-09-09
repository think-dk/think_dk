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
		return $this->save($action);
	}

	function updateAdmin($action) {
		return $this->update($action);
	}

	function updateHost($action) {
		return $this->update($action);
	}

}

?>
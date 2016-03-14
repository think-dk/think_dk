<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();
$itemtype = "wish";
$model = $IC->typeObject($itemtype);


$page->bodyClass("wishlist");
$page->pageTitle("Wishes");


if(is_array($action) && count($action)) {

	// Class interface
	if($page->validateCsrfToken() && preg_match("/[a-zA-Z]+/", $action[0])) {

		// check if custom function exists on User class
		if($model && method_exists($model, $action[0])) {

			$output = new Output();
			$output->screen($model->$action[0]($action));
			exit();
		}
	}

}

$page->page(array(
	"templates" => "pages/wishlist.php"
));

?>
 
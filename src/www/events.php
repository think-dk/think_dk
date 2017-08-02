<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();
$itemtype = "event";


$page->bodyClass("events");
$page->pageTitle("Events");


// news list for tags
// /posts/#sindex#
if(count($action) == 1) {

	$page->page(array(
		"templates" => "events/view.php"
	));
	exit();

}
else if(count($action) == 2 && is_numeric($action[0]) && is_numeric($action[1])) {

	$page->page(array(
		"templates" => "events/month.php"
	));
	exit();

}


$page->page(array(
	"templates" => "events/index.php"
));
exit();

?>

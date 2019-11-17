<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();
$itemtype = "ticket";
$model = $IC->typeObject("ticket");

$page->bodyClass("tickets");
$page->pageTitle("Tickets");


// news list for tags
// /posts/#sindex#
if(count($action) == 1) {

	$page->page(array(
		"templates" => "tickets/view.php"
	));
	exit();

}

else if(count($action) == 2 && $action[0] == "print") {

	$page->page(array(
		"type" => "ticket",
		"templates" => "tickets/ticket-layout.php"
	));
	exit();

}


$page->page(array(
	"templates" => "tickets/index.php"
));
exit();

?>

<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();
$itemtype = "project";


$page->bodyClass("projects");
$page->pageTitle("Projects");


// news list for tags
// /posts/#sindex#
if(count($action) == 1) {

	$page->page(array(
		"templates" => "projects/view.php"
	));
	exit();

}

$page->page(array(
	"templates" => "projects/index.php"
));
exit();

?>

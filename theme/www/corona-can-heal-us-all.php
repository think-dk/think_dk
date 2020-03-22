<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();


$page->bodyClass("corona");
$page->pageTitle("Corona can heal us all");


$page->page(array(
	"templates" => "pages/corona-can-heal-us-all.php"
));

?>
 
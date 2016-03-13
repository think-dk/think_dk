<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();


$page->bodyClass("join");
$page->pageTitle("Join us");


$page->page(array(
	"templates" => "signup/join.php"
));
exit();

?>

<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();


$page->bodyClass("latest");
$page->pageTitle("Latest");


$page->page(array(
	"templates" => "posts/latest.php"
));
exit();

?>

<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();
$itemtype = "subscriptions";
$model = new User();


$page->bodyClass("membership");
$page->pageTitle("Memberships");


$page->page(array(
	"templates" => "pages/memberships.php"
));
exit();

?>

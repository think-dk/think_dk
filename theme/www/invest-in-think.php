<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();


header("Location: /support");
exit();



$page->bodyClass("invest");
$page->pageTitle("Invest in think.dk");


$page->page(array(
	"templates" => "pages/invest-in-think.php"
));

?>
 
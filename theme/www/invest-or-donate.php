<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();


$page->bodyClass("donate");
$page->pageTitle("Invest or donate to think.dk");


$page->page(array(
	"templates" => "pages/invest-or-donate.php"
));

?>
 
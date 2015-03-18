<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();
$itemtype = "page";


$page->bodyClass("about");
$page->pageTitle("Hvad, Hvem, Hvorfor, Hvordan");


$page->page(array(
	"templates" => "pages/hvad-er-stopknappen.php"
));
exit();

?>

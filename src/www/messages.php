<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();


$page->bodyClass("messages");
$page->pageTitle("Messages");


$page->page(array(
	"templates" => "pages/message.php"
));
exit();

?>

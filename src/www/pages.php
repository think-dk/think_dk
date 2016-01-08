<?php
$access_item["/"] = false;
$access_item["/hemmeligheder"] = true;

if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();
$itemtype = "page";


$page->bodyClass("pages");
$page->pageTitle("Notes and other work in progress");


if(is_array($action) && count($action)) {

	# /sider/hemmeligheder - list all pages
	if($action[0] == "hemmeligheder") {

		$page->page(array(
			"templates" => "pages/list.php"
		));
		exit();
	}

	# /artikler/#sindex# - view
	else if(count($action) == 1) {

		$page->page(array(
			"templates" => "pages/view.php"
		));
		exit();
	}

}

// no page selected
$page->page(array(
	"templates" => "pages/404.php"
));

?>

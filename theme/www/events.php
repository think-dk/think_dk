<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();
$itemtype = "event";


$page->bodyClass("events");
$page->pageTitle("Events");


// news list for tags
// /posts/#sindex#
// Used by calendar to go back through months
// /events/past/#year#/#month#
if(count($action) == 1 && $action[0] == "proposal") {

	$page->page(array(
		"templates" => "events/proposal.php"
	));
	exit();
	
}
else if(count($action) == 1 && $action[0] == "forslag") {

	$page->page(array(
		"templates" => "events/forslag.php"
	));
	exit();
	
}
else if(count($action) == 1) {

	$page->page(array(
		"templates" => "events/view.php"
	));
	exit();

}
// Used by calendar to go back through months
// /events/past/#year#/#month#
else if(count($action) == 3 && $action[0] == "past" && is_numeric($action[1]) && is_numeric($action[2])) {

	$page->page(array(
		"templates" => "events/month.php"
	));
	exit();

}
else if(count($action) == 3 && $action[0] == "print" && is_numeric($action[1]) && is_numeric($action[2])) {

	$page->page(array(
		"templates" => "events/month-print.php"
	));
	exit();

}

if(count($action) == 1 && preg_match("/saveProposal/", $action[0]) && $_SERVER["REQUEST_METHOD"] === "POST" && isset($_SERVER["HTTP_ORIGIN"]) && ($_SERVER["HTTP_ORIGIN"] === "https://lsb.dk" || $_SERVER["HTTP_ORIGIN"] === "https://www.lsb.dk" || $_SERVER["HTTP_ORIGIN"] === "http://forms.lsb-kampagne.local" || $_SERVER["HTTP_ORIGIN"] === "https://forms.lsb-kampagne.dk")) {

	$model = $IC->typeObject("eventproposal");

	// check if custom function exists on User class
	if($model && method_exists($model, $action[0])) {

		$output = new Output();
		$output->screen($model->saveProposal($action));
		exit();

	}
}


// /events
// /events/#year#/#month#
$page->page(array(
	"templates" => "events/index.php"
));
exit();

?>

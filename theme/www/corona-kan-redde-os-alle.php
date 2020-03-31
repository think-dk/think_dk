<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();


$page->bodyClass("corona");
$page->pageTitle("Corona kan redde os alle");

if(count($action) == 1 && $action[0] == "signup") {

	$csrf = getPost("csrf-token");
	$model = $IC->typeObject("signee");

	if($csrf && $model->save(["signee", "save"])) {

		message()->resetMessages();

		// redirect to leave POST state
		header("Location: /corona-kan-redde-os-alle/receipt");
		exit();

	}
	else {
		// redirect to leave POST state
		header("Location: /corona-kan-redde-os-alle");
		exit();
	}

}

else if(count($action) == 1 && $action[0] == "receipt") {
	$page->page(array(
		"templates" => "pages/corona-kan-redde-os-alle-receipt.php"
	));
	exit();
}


$page->page(array(
	"templates" => "pages/corona-kan-redde-os-alle.php"
));

?>
 
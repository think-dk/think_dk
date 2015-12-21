<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$model = new User();


$page->bodyClass("newsletter");
$page->pageTitle("Nysgerrig?");


if(is_array($action) && count($action)) {

	// /newsletter/receipt (user just signed up)
	if($action[0] == "kvittering") {

		$page->page(array(
			"templates" => "pages/newsletter_receipt.php"
		));
		exit();
	}

	// /newsletter/subscribe
	else if($action[0] == "tilmelding" && $page->validateCsrfToken()) {

		$user = $model->newUser(array("newUser"));

		// successful creation
		if(isset($user["user_id"])) {

			// redirect to leave POST state
			header("Location: kvittering");
			exit();

		}

		// user exists
		else if(isset($user["status"]) && $user["status"] == "USER_EXISTS") {
			message()->addMessage("Beklager, serveren siger du enten har dårlig samvittighed eller dårlig hukommelse!", array("type" => "error"));
		}
		// something went wrong
		else {
			message()->addMessage("Beklager, serveren siger NEJ!", array("type" => "error"));
		}

	}

}

$page->page(array(
	"templates" => "pages/newsletter.php"
));

?>

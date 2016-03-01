<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$model = new User();


$page->bodyClass("signup");
$page->pageTitle("Tilmelding");


if(is_array($action) && count($action)) {

	// /signup/receipt
	if($action[0] == "kvittering") {

		$page->page(array(
			"templates" => "signup/signup_receipt.php"
		));
		exit();
	}

	// /signup/confirm/email|mobile/#email|mobile#/#verification_code#
	else if($action[0] == "bekræft" && count($action) == 4) {

		if($model->confirmUser($action)) {
			$page->page(array(
				"templates" => "signup/signup_confirmed.php"
			));
		}
		else {
			$page->page(array(
				"templates" => "signup/signup_confirmed_failed.php"
			));
		}
		exit();
	}

	// signup/save
	else if($action[0] == "save" && $page->validateCsrfToken()) {

		// create new user
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

// plain signup
// /signup
$page->page(array(
	"templates" => "signup/signup.php"
));

?>

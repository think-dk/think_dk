<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$model = new User();


$page->bodyClass("signup");
$page->pageTitle("Signup");


if(is_array($action) && count($action)) {

	// /signup/receipt
	if($action[0] == "receipt") {

		$page->page(array(
			"templates" => "signup/signup_receipt.php"
		));
		exit();
	}

	// /signup/confirm/email|mobile/#email|mobile#/#verification_code#
	else if($action[0] == "confirm" && count($action) == 4) {

		if($model->confirmUser($action)) {
			$page->page(array(
				"templates" => "signup/signup_confirmed.php"
			));
		}
		else {
			$page->page(array(
				"templates" => "signup/signup_confirmation_failed.php"
			));
		}
		exit();
	}

	// /signup/save
	else if($action[0] == "save" && $page->validateCsrfToken()) {

		// create new user
		$user = $model->newUser(array("newUser"));

		// successful creation
		if(isset($user["user_id"])) {

			// redirect to leave POST state
			header("Location: receipt");
			exit();

		}

		// user exists
		else if(isset($user["status"]) && $user["status"] == "USER_EXISTS") {
			message()->addMessage("Sorry, the computer says you either have a bad memory or a bad conscience!", array("type" => "error"));
		}
		// something went wrong
		else {
			message()->addMessage("Sorry, computer says no!", array("type" => "error"));
		}

	}

}

// plain signup directly
// /signup
$page->page(array(
	"templates" => "signup/signup.php"
));

?>

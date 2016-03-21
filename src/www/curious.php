<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$model = new User();


$page->bodyClass("newsletter");
$page->pageTitle("Curious?");


if(is_array($action) && count($action)) {

	// /newsletter/receipt (user just signed up)
	if($action[0] == "receipt") {

		$page->page(array(
			"templates" => "newsletter/receipt.php"
		));
		exit();
	}

	// /newsletter/subscribe
	else if($action[0] == "signup" && $page->validateCsrfToken()) {

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

// plain newsletter signup directly
// /curious
$page->page(array(
	"templates" => "newsletter/signup.php"
));

?>

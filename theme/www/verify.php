<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$model = new User();
$SC = new Shop();


$page->bodyClass("verify");
$page->pageTitle("Verify");


// Verification flow
if($action) {

	// verify/confirm/#email|mobile#/#verification_code#
	if($action[0] == "confirm" && count($action) == 3) {

		
		$username = $action[1];
		$verification_code = $action[2];
		session()->value("signup_email", $username);

		// debug([$username, $verification_code]);
		// Confirm username returns either true, false or an object
		$result = $model->confirmUsername($username, $verification_code);

		// code is valid
		if($result) {

			header("Location: /verify/receipt");
			exit();

		}

		// code is not valid
		else {
			// redirect to leave POST state
			header("Location: /verify/error");
			exit();
		}
	}

	// verify/receipt
	else if($action[0] == "receipt") {

		$page->page(array(
			"templates" => "verify/confirmed.php"
		));
		exit();
	}
	// verify/error
	else if($action[0] == "error") {

		$page->page(array(
			"templates" => "verify/confirmation_failed.php"
		));
		exit();
	}
	// verify/skip
	else if($action[0] == "skip") {

		$page->page(array(
			"templates" => "verify/skipped.php"
		));
		exit();

	}

}

// fallback
// /verify
$page->page(array(
	"templates" => "verify/verify.php"
));

?>


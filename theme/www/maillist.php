<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();


$page->bodyClass("maillist");
$page->pageTitle("Mail list");


if($action) {

	// view specific maillist pages
	if(count($action) == 1 && preg_match("/user-exists|error|verify|receipt/", $action[0])) {

		$page->page(array(
			"templates" => "maillist/".$action[0].".php"
		));
		exit();
	}

	# /maillist/addToMaillist
	else if($action[0] == "addToMaillist" && security()->validateCsrfToken()) {

		// create new user
		$UC = new User();
		$user = $UC->newUser(array("newUser"));

		session()->value("user_id", 1);
		session()->value("user_nickname", "");


		$headers = apache_request_headers();
		if(
			isset($headers["X-Requested-With"])
			&&
			$headers["X-Requested-With"] === "XMLHttpRequest"
		) {


				
		}


		// user exists
		// Detected bot signup
		if(isset($user["BOT_SIGNUP"])) {

			// redirect to leave POST state
			header("Location: /maillist/receipt");
			exit();

		}

		if(isset($user["status"]) && $user["status"] == "USER_EXISTS") {
			header("Location: /maillist/user-exists");
			exit();
		}
		// something went wrong
		else if(!isset($user["user_id"])) {
			header("Location: /maillist/error");
			exit();
		}
		// signup was completed – verify account
		else {
			header("Location: /maillist/verify");
			exit();
		}

	}


	// maillist/confirm
	if($action[0] == "confirm" && security()->validateCsrfToken()) {

		$username = session()->value("signup_email");
		$verification_code = getPost("verification_code");

		// Only attempt confirmation if username is still available in session
		if($username) {

			$UC = new User();
		
			// Verify and enable user
			$result = $UC->confirmUsername($username, $verification_code);

			// exit();
			// user has already been verified
			if($result) {

				header("Location: /maillist/receipt");
				exit();

			}

			// code is not valid
			else {

				message()->addMessage("Incorrect verification code, please check the code and try again!", array("type" => "error"));
				header("Location: /maillist/verify");
				exit();
			}

		}
		else {

			header("Location: /maillist/verify");
			exit();		

		}
	}


}


// no direct actions
// /maillist
$page->page(array(
	"templates" => "pages/404.php"
));
?>

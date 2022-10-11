<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$model = new Shop();


$page->bodyClass("membership");
$page->pageTitle("Memberships");


if($action) {


	# /memberships/already-member
	if($action[0] == "already-member") {

		$page->page(array(
			"templates" => "memberships/already-member.php"
		));
		exit();

	}
	
	# /memberships/checkout
	else if($action[0] == "checkout") {

		$user_id = session()->value("user_id");
		if($user_id > 1) {

			// check if user is already a member
			$MC = new Member();
			$membership = $MC->getMembership();
			if($membership && $membership["subscription_id"]) {

				header("Location: already-member");
				exit();

			}

		}

		$cart = $model->getCart();

		// cart already has user, redirect to shop checkout
		if($cart && $cart["user_id"]) {
			header("Location: /shop/checkout");
			exit();
		}

		$page->page(array(
			"templates" => "memberships/checkout.php"
		));
		exit();
	}
	
	# /memberships/addToCart
	else if($action[0] == "addToCart" && security()->validateCsrfToken()) {

		$user_id = session()->value("user_id");
		if($user_id > 1) {

			$UC = new User();
			$MC = new Member();
			$membership = $MC->getMembership();
			if($membership && $membership["subscription_id"]) {

				header("Location: already-member");
				exit();

			}
		}

		// add membership to new or existing cart
		$cart = $model->addToCart(array("addToCart"));


		// successful creation
		if($cart) {

			if($cart["user_id"]) {
				header("Location: /shop/checkout");
			}
			else {
				header("Location: checkout");
			}
			exit();
		}
		// something went wrong
		else {
			message()->addMessage("Colonizing Mars! Waw. The computer is so excited it cannot process your request right now. Try again later.", array("type" => "error"));
		}

	}
	# /memberships/signup
	else if($action[0] == "signup" && security()->validateCsrfToken()) {

		// create new user
		$UC = new User();
		$user = $UC->newUser(array("newUser"));

		// user exists
		if(isset($user["status"]) && $user["status"] == "USER_EXISTS") {
			message()->addMessage("A user already exists with that email. Try <a href=\"/login\">logging in</a>.", array("type" => "error"));
		}
		// something went wrong
		else if(!isset($user["user_id"])) {
			message()->addMessage("Blib, Blob, Bliiiiip", array("type" => "error"));
		}

		if(message()->hasMessages(array("type" => "error"))) {
			// return to checkout page with posted variables to pre-populate form
			$page->page(array(
				"templates" => "memberships/checkout.php"
			));
		}
		// signup was completed
		else {
			header("Location: /shop/verify");
			exit();
		}
		exit();
	}


	# /memberships/signup
	else if($action[0] == "addToMaillist" && security()->validateCsrfToken()) {

		// create new user
		$UC = new User();
		$user = $UC->newUser(array("newUser"));

		print_r($user);
		// user exists
		if(isset($user["status"]) && $user["status"] == "USER_EXISTS") {
			
			header("Location: /memberships/maillist/user-exists");
			exit();
		}
		// something went wrong
		else if(!isset($user["user_id"])) {
			header("Location: /memberships/maillist/error");
			exit();
		}

		// if(message()->hasMessages(array("type" => "error"))) {
		// 	// return to checkout page with posted variables to pre-populate form
		// 	$page->page(array(
		// 		"templates" => "memberships/checkout.php"
		// 	));
		// }
		// signup was completed
		else {
			header("Location: /memberships/maillist/verify");
			exit();
		}
		exit();
	}

	# /memberships/signup
	else if($action[0] == "maillist") {

		// view specific membership
		if(count($action) == 2 && preg_match("/user-exists|error/", $action[1])) {

			$page->page(array(
				"templates" => "maillist/".$action[1].".php"
			));
			exit();
		}

	}

	// view specific membership
	else if(count($action) == 1 && !preg_match("/signup|addToCart/", $action[0])) {

		$page->page(array(
			"templates" => "memberships/view.php"
		));
		exit();
	}

}

// plain signup directly
// /signup
$page->page(array(
	"templates" => "memberships/index.php"
));
?>

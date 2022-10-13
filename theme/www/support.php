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


	# /support/already-member
	if($action[0] == "already-account") {

		$page->page(array(
			"templates" => "support/already-account.php"
		));
		exit();

	}
	
	# /support/checkout
	else if($action[0] == "checkout") {

		// get current cart
		$cart = $model->getCart();


		$user_id = session()->value("user_id");
		if($user_id > 1) {

			$IC = new Items();
			$MC = new Member();

			// Is membership in cart


			$membership_in_cart = false;
			// attempt to find membership in cart
			if($cart && $cart["items"]) {

				foreach($cart["items"] as $cart_item) {

					$item = $IC->getItem(array("id" => $cart_item["item_id"], "extend" => true));
					if($item["itemtype"] == "membership") {
						$membership_in_cart = $item["name"];
						break;
					}

				}

			}

			// check if user is already a member
			$membership = $MC->getMembership();

			// If already a member and membership in cart
			if($membership_in_cart && $membership && $membership["subscription_id"]) {

				header("Location: already-account");
				exit();

			}

		}

		// cart already has user, redirect to shop checkout
		if($cart && $cart["user_id"]) {
			header("Location: /shop/checkout");
			exit();
		}

		$page->page(array(
			"templates" => "support/checkout.php"
		));
		exit();
	}
	
	# /support/addToCart
	else if($action[0] == "addToCart" && security()->validateCsrfToken()) {

		$user_id = session()->value("user_id");
		if($user_id > 1) {

			$UC = new User();
			$MC = new Member();
			$IC = new Items();


			// Was added item a membership
			$item_id = getPost("item_id");
			$item = $IC->getItem(["id" => $item_id]);

			$membership = $MC->getMembership();
			if($item && $item["itemtype"] === "membership" && $membership && $membership["subscription_id"]) {

				header("Location: already-account");
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
	# /support/signup
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
			message()->addMessage("Blib, Blob, Bliiiiip. We don't know what happened but it wasn't good.", array("type" => "error"));
		}

		if(message()->hasMessages(array("type" => "error"))) {
			// return to checkout page with posted variables to pre-populate form
			$page->page(array(
				"templates" => "support/checkout.php"
			));
		}
		// signup was completed
		else {
			header("Location: /shop/verify");
			exit();
		}
		exit();
	}

	//
	// # /support/signup
	// else if($action[0] == "addToMaillist" && security()->validateCsrfToken()) {
	//
	// 	// create new user
	// 	$UC = new User();
	// 	$user = $UC->newUser(array("newUser"));
	//
	// 	print_r($user);
	// 	// user exists
	// 	if(isset($user["status"]) && $user["status"] == "USER_EXISTS") {
	//
	// 		header("Location: /support/maillist/user-exists");
	// 		exit();
	// 	}
	// 	// something went wrong
	// 	else if(!isset($user["user_id"])) {
	// 		header("Location: /support/maillist/error");
	// 		exit();
	// 	}
	//
	// 	// if(message()->hasMessages(array("type" => "error"))) {
	// 	// 	// return to checkout page with posted variables to pre-populate form
	// 	// 	$page->page(array(
	// 	// 		"templates" => "support/checkout.php"
	// 	// 	));
	// 	// }
	// 	// signup was completed
	// 	else {
	// 		header("Location: /support/maillist/verify");
	// 		exit();
	// 	}
	// 	exit();
	// }
	//
	// # /support/signup
	// else if($action[0] == "maillist") {
	//
	// 	// view specific membership
	// 	if(count($action) == 2 && preg_match("/user-exists|error/", $action[1])) {
	//
	// 		$page->page(array(
	// 			"templates" => "maillist/".$action[1].".php"
	// 		));
	// 		exit();
	// 	}
	//
	// }
	//
	// // view specific membership
	// else if(count($action) == 1 && !preg_match("/signup|addToCart/", $action[0])) {
	//
	// 	$page->page(array(
	// 		"templates" => "support/view.php"
	// 	));
	// 	exit();
	// }

}

// plain signup directly
// /signup
$page->page(array(
	"templates" => "support/index.php"
));
?>

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

	// verify/confirm
	if($action[0] == "confirm") {

		if (count($action) == 1 && $page->validateCsrfToken()) {
			
			$username = session()->value("signup_email");
			$verification_code = getPost("verification_code");
			
			// Verify and enable user
			$result = $model->confirmUsername($username, $verification_code);

			// user has already been verified
			if($result && isset($result["status"]) && $result["status"] == "USER_VERIFIED") {
				message()->addMessage("You're already verified! Try logging in.", array("type" => "message"));
				header("Location: /login");
				exit();
			}

			// code is valid
			else if($result) {

				// check if there is a cart
				$cart = $SC->getCart();
				// cart exists
				if($cart) {
					$total_price = $SC->getTotalCartPrice($cart["id"]);

					// if order has price
					if($total_price && $total_price["price"]) {
						// redirect to leave POST state
						// to checkout and confirm order
						message()->addMessage("You're now verified", array("type" => "message"));
						header("Location: /shop/checkout");
						exit();
					}
					// order is zero priced
					else {
						// confirm free order directly (this will redirect to receipt)
						header("Location: /shop/confirm/".$cart["cart_reference"]);
						exit();
					}
				}
				// no cart - go to cart
				else {
					message()->addMessage("You're now verified", array("type" => "message"));
					header("Location: /shop/cart");
					exit();
				}

			}

			// code is not valid
			else {
				message()->addMessage("Incorrect verification code, try again!", array("type" => "error"));
				header("Location: /verify");
				exit();
			}
		}


		// verify/confirm/#email|mobile#/#verification_code#
		else if(count($action) == 3) {
			
			$username = $action[1];
			$verification_code = $action[2];
			session()->value("signup_email", $username);

			// Confirm username returns either true, false or an object
			$result = $model->confirmUsername($username, $verification_code);

			// user has already been verified
			if($result && isset($result["status"]) && $result["status"] == "USER_VERIFIED") {
				message()->addMessage("You're already verified! Try logging in.", array("type" => "error"));
				header("Location: /login");
				exit();
			}

			// code is valid
			else if($result) {
				// check if there is a cart
				$cart = $SC->getCart();
				// cart exists
				if($cart) {
					$total_price = $SC->getTotalCartPrice($cart["id"]);

					// if order has price
					if($total_price && $total_price["price"]) {
						header("Location: /verify/receipt");
						exit();
					}
					// order is zero priced
					else {
						// confirm free order directly (this will redirect to receipt)
						header("Location: /shop/confirm/".$cart["cart_reference"]);
						exit();
					}
				}
				// no cart
				else {
					header("Location: /verify/receipt");
				}

			}

			// code is not valid
			else {
				// redirect to leave POST state
				header("Location: /verify/error");
				exit();
			}
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

		header("Location: /shop/checkout");
		exit();
	}

}

// fallback
// /verify
$page->page(array(
	"templates" => "verify/verify.php"
));

?>


<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$model = new Shop();


$page->bodyClass("shop");
$page->pageTitle("Shop");


if($action) {

	// /shop/receipt
	if($action[0] == "receipt") {


		if(count($action) == 3 && $action[2] == "error") {

			$page->page(array(
				"templates" => "shop/receipt/error.php"
			));
			exit();

		}

		// if payment id exists (gateway payment receipt)
		else if(count($action) == 4) {

			$page->page(array(
				"templates" => "shop/receipt/".$action[2].".php"
			));
			exit();

		}
		// ALL OTHER VARIATIONS (THAN ERROR) ARE HANDLED IN RECEIPT TEMPLATE
		else {

			$page->page(array(
				"templates" => "shop/receipt/index.php"
			));
			exit();

		}

	}

	// /shop/bulk-receipt
	else if($action[0] == "bulk-receipt") {

		if(count($action) == 3 && $action[2] == "error") {

			$page->page(array(
				"templates" => "shop/receipt/error.php"
			));
			exit();

		}

		// if payment id exists (gateway payment receipt)
		else if(count($action) == 4) {

			$page->page(array(
				"templates" => "shop/receipt/".$action[2]."-bulk.php"
			));
			exit();

		}

		// ALL OTHER VARIATIONS (THAN ERROR) ARE HANDLED IN RECEIPT TEMPLATE
		else {

			$page->page(array(
				"templates" => "shop/receipt/index-bulk.php"
			));
			exit();

		}

	}

	// /shop/payment-gateway/#order_ids#/#gateway#/[process]
	else if($action[0] == "payment-gateway") {

		// specific gateway payment window
		if(count($action) == 3) {

			$page->page(array(
				"type" => "payment",
				"templates" => "shop/gateway/".$action[2].".php"
			));
			exit();

		}

		// process payment
		else if(count($action) == 4 && $action[3] == "process" && $page->validateCsrfToken()) {

			$payment_id = $model->processOrderPayment($action);
			if($payment_id) {

				// redirect to leave POST state
				header("Location: /shop/receipt/".$action[1]."/".$action[2]."/".$payment_id);
				exit();

			}
			else {

				// redirect to leave POST state
				header("Location: /shop/receipt/".$action[1]."/error");
				exit();

			}

		}

	}

	// /shop/bulk-payment-gateway/#order_ids#/#gateway#/[process]
	else if($action[0] == "bulk-payment-gateway") {

		// specific gateway payment window
		if(count($action) == 3) {

			$page->page(array(
				"type" => "payment",
				"templates" => "shop/gateway/".$action[2]."-bulk.php"
			));
			exit();

		}

		// process payment
		else if(count($action) == 4 && $action[3] == "process" && $page->validateCsrfToken()) {




			$payment_id = $model->processBulkOrderPayment($action);

			// TODO: find better way to avoid messages spilling over
			// suppress messages
			message()->resetMessages();

			if($payment_id) {


				// redirect to leave POST state
				header("Location: /shop/bulk-receipt/".$action[1]."/".$action[2]."/".$payment_id);
				exit();

			}
			else {

				// redirect to leave POST state
				header("Location: /shop/bulk-receipt/".$action[1]."/error");
				exit();

			}

		}

	}

	# /shop/checkout
	else if($action[0] == "checkout") {

		$page->page(array(
			"templates" => "shop/checkout.php"
		));
		exit();
	}

	# /shop/profile
	else if($action[0] == "profile") {

		$page->page(array(
			"templates" => "shop/profile.php"
		));
		exit();
	}


	# /shop/confirm/#cart_reference#
	else if($action[0] == "confirm" && count($action) == 2) {

		$order = $model->newOrderFromCart($action);
		if($order) {

			$price = $model->getTotalOrderPrice($order["id"]);
			if($price["price"] > 0) {

				// redirect to leave POST state
				header("Location: /shop/payment/".$order["order_no"]);
				exit();
			}
			else {
				// redirect to leave POST state
				header("Location: /shop/receipt/".$order["order_no"]);
				exit();
			}

		}
		else {

			// redirect to leave POST state
			header("Location: /shop/cart");
			exit();

			// $page->page(array(
			// 	"templates" => "shop/checkout.php"
			// ));
		}
		exit();
	}

	# /shop/payment/#order_no#
	else if($action[0] == "payment" && count($action) == 2) {

		$page->page(array(
			"templates" => "shop/payment.php"
		));
		exit();
	}
	# /shop/payments (all open payments)
	else if($action[0] == "payments" && count($action) == 1) {

		$page->page(array(
			"templates" => "shop/payments.php"
		));
		exit();
	}

	# /shop/selectPaymentMethod
	else if($action[0] == "selectPaymentMethod" && $page->validateCsrfToken()) {

		// register payment method
		$payment_method = $model->selectPaymentMethod(array("selectPaymentMethod"));

		// if gateway is specified - proceed to gateway
		if($payment_method["gateway"]) {

			// redirect to leave POST state
			header("Location: /shop/payment-gateway/".$payment_method["order_no"]."/".$payment_method["gateway"]);
			exit();

		}
		// no gateway, means manual payment - go to receipt page
		else if($payment_method["classname"] && $payment_method["classname"] !== "disabled") {

			// redirect to leave POST state
			header("Location: /shop/receipt/".$payment_method["order_no"]."/".$payment_method["classname"]);
			exit();
			
		}
		// no gateway, no custom receipt
		else {

			// redirect to leave POST state
			header("Location: /shop/receipt/".$payment_method["order_no"]);
			exit();

		}

	}


	# /shop/bulkPayment
	else if($action[0] == "selectBulkPaymentMethod" && $page->validateCsrfToken()) {

		// register payment method
		$payment_method = $model->selectBulkPaymentMethod(array("selectBulkPaymentMethod"));

		// if gateway is specified - proceed to gateway
		if($payment_method["gateway"]) {

			// redirect to leave POST state
			header("Location: /shop/bulk-payment-gateway/".$payment_method["order_ids"]."/".$payment_method["gateway"]);
			exit();

		}
		// no gateway, means manual payment - go to receipt page
		else if($payment_method["classname"] && $payment_method["classname"] !== "disabled") {

			// redirect to leave POST state
			header("Location: /shop/bulk-receipt/".$payment_method["order_ids"]."/".$payment_method["classname"]);
			exit();
			
		}
		// no gateway, no custom receipt
		else {

			// redirect to leave POST state
			header("Location: /shop/bulk-receipt/".$payment_method["order_ids"]);
			exit();

		}

	}


	# /shop/addToCart
	else if($action[0] == "addToCart" && $page->validateCsrfToken()) {

		// create new user
		$cart = $model->addToCart(array("addToCart"));

		// successful creation
		if($cart) {

			message()->addMessage("Item added");
			header("Location: cart");
			exit();
		}
		// something went wrong
		else {
			message()->addMessage("Colonizing Mars! Waw. The computer is so excited it cannot process your request right now. Try again later.", array("type" => "error"));
		}

	}

	# /shop/updateCartItemQuantity
	else if($action[0] == "updateCartItemQuantity" && $page->validateCsrfToken()) {

		// create new user
		$cart = $model->updateCartItemQuantity($action);

		// successful creation
		if($cart) {

			message()->addMessage("Quantity updated");
			header("Location: /shop/cart");
			exit();
		}
		// something went wrong
		else {
			message()->addMessage("Colonizing Mars! Waw. The computer is so excited it cannot process your request right now. Try again later.", array("type" => "error"));
		}

	}

	# /shop/updateCartItemQuantity
	else if($action[0] == "deleteFromCart" && $page->validateCsrfToken()) {

		// create new user
		$cart = $model->deleteFromCart($action);

		// successful creation
		if($cart) {

			message()->addMessage("Item deleted from cart");
			header("Location: /shop/cart");
			exit();
		}
		// something went wrong
		else {
			message()->addMessage("Colonizing Mars! Waw. The computer is so excited it cannot process your request right now. Try again later.", array("type" => "error"));
		}

	}

	# /shop/signup
	else if($action[0] == "signup" && $page->validateCsrfToken()) {

		// create new user
		$UC = new User();
		$user = $UC->newUser(array("newUser"));

		// user exists
		if(isset($user["status"]) && $user["status"] == "USER_EXISTS") {
			message()->addMessage("A user already exists with that email. Try logging in.", array("type" => "error"));
		}
		// something went wrong
		else if(!isset($user["user_id"])) {
			message()->addMessage("Blib, Blob, Bliiiiip", array("type" => "error"));
		}

		if(message()->hasMessages(array("type" => "error"))) {
			// return to checkout page with posted variables to pre-populate form
			$page->page(array(
				"templates" => "shop/checkout.php"
			));
		}
		// signup was completed
		else {
			header("Location: /verify");
			exit();
		}
		exit();
	}

	# /shop/updateProfile
	else if($action[0] == "updateProfile" && $page->validateCsrfToken()) {

		// create new user
		$UC = new User();
		$user = $UC->update(array("update"));

		// redirect to leave POST state
		header("Location: /shop/checkout");
		exit();
	}

	# /shop/selectAddress
	else if($action[0] == "selectAddress" && $page->validateCsrfToken()) {

		if($model->updateCart(array("updateCart"))) {
			// redirect to leave POST state
			header("Location: /shop/checkout");
			exit();
		}
		else {
			$page->page(array(
				"templates" => "shop/address.php"
			));
			exit();
		}

	}

	# /shop/addAddress
	else if($action[0] == "addAddress" && count($action) == 2 && $page->validateCsrfToken()) {

		$UC = new User();
		$address = $UC->addAddress(array("addAddress"));
		if($address) {
			$_POST[$action[1]."_address_id"] = $address["id"];

			if($model->updateCart(array("updateCart"))) {

				// redirect to leave POST state
				header("Location: /shop/checkout");
				exit();
			}
		}

		$page->page(array(
			"templates" => "shop/address.php"
		));
		exit();
	}

	# /shop/address
	else if($action[0] == "address" && count($action) == 2) {

		$page->page(array(
			"templates" => "shop/address.php"
		));
		exit();
	}

}

// plain signup directly
// /signup
$page->page(array(
	"templates" => "shop/cart.php"
));

?>

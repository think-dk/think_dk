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


		if(count($action) >= 3 && $action[1] === "orders") {

			$page->page(array(
				"templates" => "shop/receipt/orders.php"
			));
			exit();

		}
		else if(count($action) >= 3 && $action[1] === "new-order") {

			$page->page(array(
				"templates" => "shop/receipt/new-order.php"
			));
			exit();

		}
		else if(count($action) >= 3 && $action[1] === "order") {

			$page->page(array(
				"templates" => "shop/receipt/order.php"
			));
			exit();

		}
		else {

			$page->page(array(
				"templates" => "shop/receipt/error.php"
			));
			exit();

		}

	}

	// /shop/payment-gateway/#gateway#/cart/#cart_reference#/[process]
	// /shop/payment-gateway/#gateway#/order/#order_no#/[process]
	// /shop/payment-gateway/#gateway#/orders/#order_ids#/[process]
	else if($action[0] == "payment-gateway") {

		// specific gateway payment window for cart
		if(count($action) == 4 && $action[2] === "cart") {

			$page->page(array(
				"type" => "payment",
				"templates" => "shop/gateway/".$action[1]."-cart.php"
			));
			exit();

		}

		// specific gateway payment window for order
		else if(count($action) == 4 && $action[2] === "order") {

			$page->page(array(
				"type" => "payment",
				"templates" => "shop/gateway/".$action[1]."-order.php"
			));
			exit();

		}

		// specific gateway payment window for orders
		else if(count($action) == 4 && $action[2] === "orders") {

			$page->page(array(
				"type" => "payment",
				"templates" => "shop/gateway/".$action[1]."-orders.php"
			));
			exit();

		}

		// process payment method for cart
		else if(count($action) == 5 && $action[2] === "cart" && $action[4] == "process" && $page->validateCsrfToken()) {

			$gateway = $action[1];
			$cart_reference = $action[3];

			$payment_method_result = $model->processCardForCart($action);
			if($payment_method_result) {

				if($payment_method_result["status"] === "success") {

					$return_url = str_replace("{GATEWAY}", $gateway, SITE_PAYMENT_REGISTER_INTENT);
					$result = payments()->requestPaymentIntentForCart($payment_method_result["cart"], $payment_method_result["card"]["id"], $return_url);
					if($result) {

						if($result["status"] === "PAYMENT_READY") {

							// redirect to leave POST state
							header("Location: $return_url/?payment_intent=".$result["payment_intent_id"]);
							exit();

						}
						else if($result["status"] === "ACTION_REQUIRED") {

							// redirect to leave POST state
							header("Location: ".$result["action"]);
							exit();
					
						}

						else if($result["status"] === "error") {

							// Some error from Stripe
							message()->addMessage($result["message"], ["type" => "error"]);
							// redirect to leave POST state
							header("Location: /shop/payment-gateway/".$gateway."/cart/".$cart_reference);
							exit();

						}

					}

				}
				else if($payment_method_result["status"] === "STRIPE_ERROR" || $payment_method_result["status"] === "CART_NOT_FOUND") {

					message()->addMessage($payment_method_result["message"], ["type" => "error"]);
					// redirect to leave POST state
					header("Location: /shop/checkout");
					exit();

				}

			}

			// Janitor Validation failed
			// redirect to leave POST state
			header("Location: /shop/payment-gateway/".$gateway."/cart/".$cart_reference);
			exit();

		}

		// process payment method for order
		else if(count($action) == 5 && $action[2] === "order" && $action[4] == "process" && $page->validateCsrfToken()) {

			$gateway = $action[1];
			$order_no = $action[3];


			$payment_method_result = $model->processCardForOrder($action);
			if($payment_method_result) {

				if($payment_method_result["status"] === "success") {

					$return_url = str_replace("{GATEWAY}", $gateway, SITE_PAYMENT_REGISTER_PAID_INTENT);
					$result = payments()->requestPaymentIntentForOrder(
						$payment_method_result["order"], 
						$payment_method_result["card"]["id"], 
						$return_url
					);
					if($result) {

						if($result["status"] === "PAYMENT_CAPTURED") {

							// redirect to leave POST state
							header("Location: $return_url/?payment_intent=".$result["payment_intent_id"]);
							exit();

						}
						else if($result["status"] === "ACTION_REQUIRED") {

							// redirect to leave POST state
							header("Location: ".$result["action"]);
							exit();
					
						}

						else if($result["status"] === "CARD_ERROR") {

							// Janitor Validation failed
							message()->addMessage($result["message"], ["type" => "error"]);
							// redirect to leave POST state
							header("Location: /shop/payment-gateway/".$gateway."/order/".$order_no);
							exit();

						}

					}

				}
				else if($payment_method_result["status"] === "STRIPE_ERROR" || $payment_method_result["status"] === "ORDER_NOT_FOUND") {

					message()->addMessage($result["message"], ["type" => "error"]);
					// redirect to leave POST state
					header("Location: /shop/payment/$order_no");
					exit();

				}

			}


			// Janitor Validation failed
			message()->addMessage($payment_method_result["message"], ["type" => "error"]);
			// redirect to leave POST state
			header("Location: /shop/payment/$order_no");
			exit();				

		}

		// process payment method for orders
		else if(count($action) == 5 && $action[2] === "orders" && $action[4] == "process" && $page->validateCsrfToken()) {

			$gateway = $action[1];
			$order_ids = $action[3];


			$payment_method_result = $model->processCardForOrders($action);
			if($payment_method_result) {

				if($payment_method_result["status"] === "success") {

					$return_url = str_replace("{GATEWAY}", $payment_method_result["payment_gateway"], SITE_PAYMENT_REGISTER_PAID_INTENT);
					$result = payments()->requestPaymentIntentForOrders(
						$payment_method_result["orders"],
						$payment_method_result["card"]["id"], 
						$return_url
					);
					if($result) {

						if($result["status"] === "PAYMENT_CAPTURED") {

							// redirect to leave POST state
							header("Location: $return_url/?payment_intent=".$result["payment_intent_id"]);
							exit();

						}
						else if($result["status"] === "ACTION_REQUIRED") {

							// redirect to leave POST state
							header("Location: ".$result["action"]);
							exit();
					
						}

						else if($result["status"] === "CARD_ERROR") {

							// Janitor Validation failed
							message()->addMessage($result["message"], ["type" => "error"]);
							// redirect to leave POST state
							header("Location: /shop/payment-gateway/".$gateway."/orders/".$order_ids);
							exit();

						}

					}

				}
				else if($payment_method_result["status"] === "STRIPE_ERROR" || $payment_method_result["status"] === "ORDER_NOT_FOUND") {

					message()->addMessage($result["message"], ["type" => "error"]);
					// redirect to leave POST state
					header("Location: /shop/payments");
					exit();

				}

			}


			// Janitor Validation failed
			message()->addMessage($payment_method_result["message"], ["type" => "error"]);
			// redirect to leave POST state
			header("Location: /shop/payments");
			exit();				

		}


		// Register intent
		else if(count($action) == 3 && $action[2] == "register-intent") {

			$payment_intent_id = getVar("payment_intent");

			$id_result = payments()->identifyPaymentIntent($payment_intent_id);

			if($id_result && $id_result["status"] === "success") {

				if($id_result["cart_reference"]) {

					$order = $model->newOrderFromCart(["newOrderFromCart", $id_result["cart_reference"]]);
					// Clear messages
					message()->resetMessages();
					if($order) {

						// get payment intent
						$registration_result = payments()->registerPaymentIntent($payment_intent_id, $order);
						if($registration_result["status"] === "success") {

							// redirect to leave POST state
							header("Location: /shop/receipt/new-order/".$order["order_no"]."/".superNormalize($id_result["gateway"]));
							exit();
						}

					}

				}

			}
			else if($id_result && $id_result["status"] === "error") {

				message()->addMessage($id_result["message"], ["type" => "error"]);
				// redirect to leave POST state
				if($id_result["cart_reference"]) {
					header("Location: /shop/payment-gateway/".$id_result["gateway"]."/cart/".$id_result["cart_reference"]);
				}
				else if($id_result["order_no"]) {
					header("Location: /shop/payment-gateway/".$id_result["gateway"]."/order/".$id_result["order_no"]);
				}
				
				exit();

			}

			// Fatal error
			message()->addMessage("We failed to process your payment request. Please try again or <a href=\"mailto:payment@think.dk?subject=Payment%20error&body=Payment%20Intent:%20$payment_intent_id\">contact us</a> to resolve the issue.", ["type" => "error"]);
			// redirect to leave POST state
			header("Location: /shop/receipt/error");
			exit();

		}


		// Register paid intent – for orders only
		else if(count($action) == 3 && $action[2] == "register-paid-intent") {

			$payment_intent_id = getVar("payment_intent");

			$id_result = payments()->identifyPaymentIntent($payment_intent_id);
			if($id_result && $id_result["status"] === "success") {

				// Single order
				if($id_result["order_no"]) {

					$order = $model->getOrders(["order_no" => $id_result["order_no"]]);
					if($order) {

						// Register intent for order (and subscription)
						$intent_registration_result = payments()->updatePaymentIntent($payment_intent_id, $order);
						if($intent_registration_result["status"] === "success") {

							// Register payment for order (if paid)
							if($id_result["payment_status"] === "succeeded") {

								$payment_registration_result = payments()->registerPayment($order, $id_result["payment_intent"]);

								// Clear messages
								message()->resetMessages();

								// Successful registration of payment
								if($payment_registration_result && $payment_registration_result["status"] === "REGISTERED") {

									// redirect to leave POST state
									header("Location: /shop/receipt/order/".$order["order_no"]."/".superNormalize($id_result["gateway"]));
									exit();

								}

							}

						}

					}

				}
				// Multiple orders
				else if($id_result["order_nos"]) {

					// Register payment for order (if paid)
					if($id_result["payment_status"] === "succeeded") {

						$orders = [];
						$order_nos = explode(",", $id_result["order_nos"]);
						foreach($order_nos as $order_no) {

							$order = $model->getOrders(["order_no" => $order_no]);
							if($order) {
								$orders[] = $order;
							}

						}

						$payments_registration_result = payments()->registerPayments($orders, $id_result["payment_intent"]);


						// Clear messages
						message()->resetMessages();

						// Successful registration of payment
						if($payments_registration_result && $payments_registration_result["status"] === "REGISTERED") {

							// redirect to leave POST state
							header("Location: /shop/receipt/orders/".$id_result["order_nos"]."/".superNormalize($id_result["gateway"]));
							exit();

						}

					}

				}

			}
			else if($id_result && $id_result["status"] === "error") {

				message()->addMessage($id_result["message"], ["type" => "error"]);
				// redirect to leave POST state
				if($id_result["order_no"]) {
					header("Location: /shop/payment-gateway/".$id_result["gateway"]."/order/".$id_result["order_no"]);
				}
				else if($id_result["order_nos"]) {
					header("Location: /shop/payment-gateway/".$id_result["gateway"]."/orders/".$id_result["order_nos"]);
				}
				else {
					header("Location: /shop/payments");
				}
				exit();

			}

			// Fatal error
			message()->addMessage("We failed to process your payment request. Please try again or <a href=\"mailto:payment@think.dk?subject=Payment%20error&body=Payment%20intent:%20$payment_intent_id\">contact us</a> to resolve the issue.", ["type" => "error"]);
			// redirect to leave POST state
			header("Location: /shop/receipt/error");
			exit();

		}

	}


	# /shop/checkout [POST]
	else if($action[0] == "checkout" && $_SERVER['REQUEST_METHOD'] === "POST") {

		// redirect to leave POST state
		header("Location: /shop/checkout");
		exit();
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



	# /shop/confirmCartAndSelectPaymentMethod
	else if($action[0] == "confirmCartAndSelectPaymentMethod" && count($action) == 1) {

		// register payment method
		$result = $model->selectPaymentMethodForCart(["selectPaymentMethodForCart"]);
		if($result) {

			if($result["status"] === "PROCEED_TO_GATEWAY") {

				// redirect to leave POST state
				header("Location: /shop/payment-gateway/".$result["payment_gateway"]."/cart/".$result["cart_reference"]);
				exit();

			}
			else if($result["status"] === "PROCEED_TO_RECEIPT") {

				// redirect to leave POST state
				header("Location: /shop/receipt/order/".$result["order_no"]."/".superNormalize($result["payment_name"]));
				exit();

			}
			else if($result["status"] === "ORDER_FAILED") {

				// redirect to leave POST state
				message()->addMessage("Could not create order – please try again.", ["type" => "error"]);
				header("Location: /shop/checkout");
				exit();

			}

		}

		// redirect to leave POST state
		message()->addMessage("Unrecognized payment method – please try again.", ["type" => "error"]);
		header("Location: /shop/checkout");
		exit();

	}

	# /shop/confirmCartAndSelectUserPaymentMethod
	else if($action[0] == "confirmCartAndSelectUserPaymentMethod" && count($action) == 1) {

		// register payment method
		$payment_method_result = $model->selectUserPaymentMethodForCart(["selectUserPaymentMethodForCart"]);
		if($payment_method_result && $payment_method_result["status"] === "PROCEED_TO_INTENT") {

			$return_url = str_replace("{GATEWAY}", $payment_method_result["payment_gateway"], SITE_PAYMENT_REGISTER_INTENT);
			$result = payments()->requestPaymentIntentForCart(
				$payment_method_result["cart"], 
				$payment_method_result["gateway_payment_method_id"], 
				$return_url
			);
			if($result) {

				if($result["status"] === "PAYMENT_READY") {

					// redirect to leave POST state
					header("Location: $return_url/?payment_intent=".$result["payment_intent_id"]);
					exit();

				}
				else if($result["status"] === "ACTION_REQUIRED") {

					// redirect to leave POST state
					header("Location: ".$result["action"]);
					exit();
			
				}


				else if($result["status"] === "CARD_ERROR") {

					// Janitor Validation failed
					message()->addMessage($result["message"], ["type" => "error"]);
					// redirect to leave POST state
					header("Location: /shop/payment-gateway/".$gateway."/cart/".$cart_reference);
					exit();

				}

			}
		}

		else if($payment_method_result["status"] === "PROCEED_TO_RECEIPT") {

			// redirect to leave POST state
			header("Location: /shop/receipt/order/".$result["order_no"]."/".superNormalize($result["payment_name"]));
			exit();

		}
		else if($payment_method_result["status"] === "ORDER_FAILED") {

			// redirect to leave POST state
			message()->addMessage("Could not create order – please try again.", ["type" => "error"]);
			header("Location: /shop/checkout");
			exit();

		}

		// redirect to leave POST state
		message()->addMessage("Unrecognized payment method – please try again.", ["type" => "error"]);
		header("Location: /shop/checkout");
		exit();

	}



	# /shop/selectPaymentMethodForOrder
	else if($action[0] == "selectPaymentMethodForOrder" && $page->validateCsrfToken()) {

		// register payment method
		$result = $model->selectPaymentMethodForOrder(array("selectPaymentMethodForOrder"));
		if($result["status"] === "PROCEED_TO_GATEWAY") {

			// redirect to leave POST state
			header("Location: /shop/payment-gateway/".$result["payment_gateway"]."/order/".$result["order_no"]);
			exit();

		}
		else if($result["status"] === "PROCEED_TO_RECEIPT") {

			// redirect to leave POST state
			header("Location: /shop/receipt/order/".$result["order_no"]."/".superNormalize($result["payment_name"]));
			exit();

		}

		// redirect to leave POST state
		message()->addMessage("Unrecognized payment method – please try again.", ["type" => "error"]);
		header("Location: /shop/payments");
		exit();

	}

	# /shop/selectUserPaymentMethodForOrder
	else if($action[0] == "selectUserPaymentMethodForOrder" && count($action) == 1) {

		// register payment method
		$payment_method_result = $model->selectUserPaymentMethodForOrder(["selectUserPaymentMethodForOrder"]);
		if($payment_method_result && $payment_method_result["status"] === "PROCEED_TO_INTENT") {

			$return_url = str_replace("{GATEWAY}", $payment_method_result["payment_gateway"], SITE_PAYMENT_REGISTER_PAID_INTENT);
			$result = payments()->requestPaymentIntentForOrder(
				$payment_method_result["order"], 
				$payment_method_result["gateway_payment_method_id"], 
				$return_url
			);
			if($result) {

				if($result["status"] === "PAYMENT_CAPTURED") {

					// redirect to leave POST state
					header("Location: $return_url/?payment_intent=".$result["payment_intent_id"]);
					exit();

				}
				else if($result["status"] === "ACTION_REQUIRED") {

					// redirect to leave POST state
					header("Location: ".$result["action"]);
					exit();
			
				}

			}

			// redirect to leave POST state
			message()->addMessage("Unrecognized payment method – please try again.", ["type" => "error"]);
			header("Location: /shop/payments");
			exit();
		}

		else if($payment_method_result["status"] === "PROCEED_TO_RECEIPT") {

			// redirect to leave POST state
			header("Location: /shop/receipt/order/".$payment_method_result["order_no"]."/".superNormalize($payment_method_result["payment_name"]));
			exit();

		}

		// redirect to leave POST state
		message()->addMessage("Unrecognized payment method – please try again.", ["type" => "error"]);
		header("Location: /shop/payments");
		exit();

	}



	# /shop/selectPaymentMethodForOrders
	else if($action[0] == "selectPaymentMethodForOrders" && $page->validateCsrfToken()) {

		// register payment method
		$result = $model->selectPaymentMethodForOrders(array("selectPaymentMethodForOrders"));
		if($result["status"] === "PROCEED_TO_GATEWAY") {

			// redirect to leave POST state
			header("Location: /shop/payment-gateway/".$result["payment_gateway"]."/orders/".$result["order_ids"]);
			exit();

		}
		else if($result["status"] === "PROCEED_TO_RECEIPT") {

			// redirect to leave POST state
			header("Location: /shop/receipt/orders/".$result["order_nos"]."/".superNormalize($result["payment_name"]));
			exit();

		}

		// redirect to leave POST state
		message()->addMessage("Unrecognized payment method – please try again.", ["type" => "error"]);
		header("Location: /shop/payments");
		exit();

	}

	# /shop/selectUserPaymentMethodForOrders
	else if($action[0] == "selectUserPaymentMethodForOrders" && count($action) == 1) {

		// register payment method
		$payment_method_result = $model->selectUserPaymentMethodForOrders(["selectUserPaymentMethodForOrders"]);
		if($payment_method_result && $payment_method_result["status"] === "PROCEED_TO_INTENT") {

			$return_url = str_replace("{GATEWAY}", $payment_method_result["payment_gateway"], SITE_PAYMENT_REGISTER_PAID_INTENT);
			$result = payments()->requestPaymentIntentForOrders(
				$payment_method_result["orders"], 
				$payment_method_result["gateway_payment_method_id"], 
				$return_url
			);
			if($result) {

				if($result["status"] === "PAYMENT_CAPTURED") {

					// redirect to leave POST state
					header("Location: $return_url/?payment_intent=".$result["payment_intent_id"]);
					exit();

				}
				else if($result["status"] === "ACTION_REQUIRED") {

					// redirect to leave POST state
					header("Location: ".$result["action"]);
					exit();
			
				}

			}

			// redirect to leave POST state
			message()->addMessage("Unrecognized payment method – please try again.", ["type" => "error"]);
			header("Location: /shop/payments");
			exit();
		}

		else if($payment_method_result["status"] === "PROCEED_TO_RECEIPT") {

			// redirect to leave POST state
			header("Location: /shop/receipt/orders/".$payment_method_result["order_nos"]."/".superNormalize($payment_method_result["payment_name"]));
			exit();

		}

		// redirect to leave POST state
		message()->addMessage("Unrecognized payment method – please try again.", ["type" => "error"]);
		header("Location: /shop/payments");
		exit();

	}



	# /shop/confirmOrder
	else if($action[0] == "confirmOrder" && count($action) == 2) {

		$cart_reference = $action[1];
		$cart = $model->getCarts(["cart_reference" => $cart_reference]);
		if($cart) {

			$order = $model->newOrderFromCart(["newOrderFromCart", $cart["cart_reference"]]);
			if($order) {

				// Clear messages
				message()->resetMessages();

				$total_order_price = $model->getTotalOrderPrice($order["id"]);
				if($total_order_price["price"] > 0) {

					// redirect to leave POST state
					header("Location: /shop/payment-options/".$order["order_no"]);
					exit();

				}
				// 0-order, no payment required
				else {

					// redirect to leave POST state
					header("Location: /shop/receipt/new-order/".$order["order_no"]);
					exit();

				}

			}

		}
		else {

			message()->addMessage("Could not process order – please try again.", ["type" => "error"]);

			// redirect to leave POST state
			header("Location: /shop/cart");
			exit();

		}
		exit();
	}

	# /shop/payment-options/#order_no#
	else if($action[0] == "payment-options" && count($action) == 2) {

		$page->page(array(
			"templates" => "shop/payment-options.php"
		));
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

		message()->resetMessages();


		// create new user
		$cart = $model->updateCartItemQuantity($action);

		// successful creation
		if($cart) {

			if(!message()->hasMessages()) {
				message()->addMessage("Quantity updated");
			}
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

			// return to checkout page with posted variables to pre-populate form
			$page->page(array(
				"templates" => "shop/checkout.php"
			));
			exit();

		}
		// something went wrong
		else if(!isset($user["user_id"])) {

			message()->addMessage("Blib, Blob, Bliiiiip", array("type" => "error"));

			// return to checkout page with posted variables to pre-populate form
			$page->page(array(
				"templates" => "shop/checkout.php"
			));
			exit();

		}
		// signup was completed
		else {

			header("Location: /shop/verify");
			exit();

		}

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


	# /shop/verify
	else if($action[0] == "verify") {

		// /shop/verify/confirm
		if(count($action) == 2 && $action[1] == "confirm" && $page->validateCsrfToken()) {

			$username = session()->value("signup_email");
			$verification_code = getPost("verification_code");
	
			$UC = new User();
	
			// Verify and enable user
			$result = $UC->confirmUsername($username, $verification_code);

			// code is valid
			if($result) {

				// check if there is a cart
				$cart = $model->getCart();
				// cart exists
				if($cart) {
					$total_price = $model->getTotalCartPrice($cart["id"]);

					// if order has price
					if($total_price && $total_price["price"]) {
						// redirect to leave POST state
						// to checkout and confirm order
						message()->addMessage("You're now verified – please go ahead and confirm your order.", array("type" => "message"));
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
				header("Location: /shop/verify");
				exit();
			}

		}
		// /shop/verify/skip
		else if(count($action) == 2 && $action[1] == "skip") {

			header("Location: /shop/checkout");
			exit();

		}
		
		else {

			// /verify
			$page->page(array(
				"templates" => "shop/verify.php"
			));
			exit();

		}

	}


}

// plain signup directly
// /signup
$page->page(array(
	"templates" => "shop/cart.php"
));

?>

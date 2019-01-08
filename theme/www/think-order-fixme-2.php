<?php
$access_item["/"] = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();


$page->bodyClass("fixme");
$page->pageTitle("FIXME");

$SC = new Shop();
include_once("classes/users/superuser.class.php");
$UC = new SuperUser();
$query = new Query();



// Remove subscription_method for Curious cat
$sql = "UPDATE think_dk.items_subscription_method SET subscription_method_id = 2 WHERE id = 4";
$query->sql($sql);


// Find all user_item_subscriptions with item_id=205 and expires_at set

$sql = "SELECT * FROM think_dk.user_item_subscriptions WHERE item_id = 205 AND expires_at IS NOT NULL";
$query->sql($sql);
$subscriptions = $query->results();
// debug([$subscriptions]);

if($subscriptions) {
	
	foreach($subscriptions as $subscription) {

		debug([$subscription]);

		if($subscription["payment_method"]) {

			debug("old member");

			// move renewed_at one month back
			// delete expires_at
			// Change modified_at to renewed_at

			// Find old order – update order_id for subscription
			$sql = "SELECT * FROM think_dk.shop_orders WHERE user_id = ".$subscription["user_id"];
			$query->sql($sql);
			$orders = $query->results();

						// debug([$orders]);

			// Delete new order


			if(count($orders) >= 2) {
				$previous_order_id = $orders[count($orders)-2]["id"];
				$current_order_id = $orders[count($orders)-1]["id"];

				$updated_renewed_at = date("Y-m-d H:i:s", strtotime($subscription["renewed_at"] . " -1 month"));

				// Update subscription data
				$sql = "UPDATE think_dk.user_item_subscriptions SET order_id = $previous_order_id, expires_at = NULL, renewed_at = '$updated_renewed_at', modified_at = '$updated_renewed_at' WHERE id = ".$subscription["id"];
				debug($sql);
				$query->sql($sql);
				
//debug([$orders[count($orders)-2]]);
				// Delete current order
				$sql = "DELETE FROM think_dk.shop_orders WHERE id = $current_order_id";
				debug($sql);
				$query->sql($sql);


				// Update previous order comment if bad
				if(preg_match("/Cat \(\d/", $orders[count($orders)-2]["comment"])) {
					debug(["BAD COMMENT", $orders[count($orders)-2]]);

					$sql = "UPDATE think_dk.shop_orders SET comment = 'Curious Cat (Downgrade)' WHERE id = $previous_order_id";
					debug($sql);
					$query->sql($sql);

				}

				debug(["SHOULD BE ORDER: " . $orders[count($orders)-2]["order_no"]]);

			}


			else {
				debug("PROBLEM");
			}


		}
		else {

			$sql = "SELECT * FROM think_dk.shop_orders WHERE user_id = ".$subscription["user_id"];
			$query->sql($sql);
			$orders = $query->results();

			debug("CC member");
//
// //			debug([$orders]);
//


			// Find old orders – more than one?
			if(count($orders) >= 2) {
				debug(["SHOULD BE ORDER: " . $orders[count($orders)-2]["order_no"]]);

				if(preg_match("/^2019-01-08/", $subscription["modified_at"])) {
					
					debug(["IN LINE"]);

					$previous_order_id = $orders[count($orders)-2]["id"];
					$current_order_id = $orders[count($orders)-1]["id"];

					if(count($orders) > 2) {
						$updated_renewed_at = date("Y-m-d H:i:s", strtotime($subscription["renewed_at"] . " -1 month"));

						// Update subscription data
						$sql = "UPDATE think_dk.user_item_subscriptions SET order_id = $previous_order_id, expires_at = NULL, renewed_at = '$updated_renewed_at', modified_at = '$updated_renewed_at' WHERE id = ".$subscription["id"];
					}
					else {

						// Update subscription data
						$sql = "UPDATE think_dk.user_item_subscriptions SET order_id = $previous_order_id, expires_at = NULL, renewed_at = NULL, modified_at = NULL WHERE id = ".$subscription["id"];
						
					}
					debug($sql);
					$query->sql($sql);
				
	//debug([$orders[count($orders)-2]]);
					// Delete current order
					$sql = "DELETE FROM think_dk.shop_orders WHERE id = $current_order_id";
					debug($sql);
					$query->sql($sql);


					// Update previous order comment if bad
					if(preg_match("/Cat \(\d/", $orders[count($orders)-2]["comment"])) {
						debug(["BAD COMMENT", $orders[count($orders)-2]]);

						$sql = "UPDATE think_dk.shop_orders SET comment = 'Curious Cat (Signup)' WHERE id = $previous_order_id";
						debug($sql);
						$query->sql($sql);

					}

				}
				else {
					debug(["OUT OF LINE"]);

					// Only remove expires_at
					$sql = "UPDATE think_dk.user_item_subscriptions SET expires_at = NULL WHERE id = ".$subscription["id"];
					debug($sql);
					$query->sql($sql);
					

				}

			}
			// NOT RENEWED
			else {

				debug("NOT RENEWED");

				$current_order_id = $orders[count($orders)-1]["id"];

				// Update subscription data
				$sql = "UPDATE think_dk.user_item_subscriptions SET expires_at = NULL WHERE id = ".$subscription["id"];
				debug($sql);
				$query->sql($sql);

				// Update previous order comment if bad
				if(preg_match("/Cat \(\d/", $orders[count($orders)-1]["comment"])) {
					debug(["BAD COMMENT", $orders[count($orders)-1]]);

					$sql = "UPDATE think_dk.shop_orders SET comment = 'Curious Cat (Signup)' WHERE id = $current_order_id";
					debug($sql);
					$query->sql($sql);

				}


				debug([$orders]);
			}

		}
	
	}

}

// Correct last bad comment
$sql = "UPDATE think_dk.shop_orders SET comment = 'Curious Cat (Signup)' WHERE id = 994";
$query->sql($sql);


// Fix broken order line (492 is missing)
$sql = "SELECT * FROM think_dk.shop_orders WHERE id = 492";
if(!$query->sql($sql)) {

	debug(["SHOULD FIX ORDER LINE"]);

	$sql = "SELECT * FROM think_dk.shop_orders WHERE id = 491";
	$query->sql($sql);
	$ref_order = $query->result(0);

	// debug([$ref_order]);

	// Move order 491 to 492
	$sql = "UPDATE think_dk.shop_orders SET id = 492 WHERE id = 491";
	debug($sql);
	$query->sql($sql);

	// insert new 491
	$sql = "INSERT INTO think_dk.shop_orders SET id = 491, user_id = 142, order_no = 'WEB491', billing_name = 'Anja', comment = 'Changer Light (Signup)', country = 'DK', currency = 'DKK', status = 3, payment_status = 0, shipping_status = 0, created_at = '".$ref_order["created_at"]."', modified_at='".$ref_order["modified_at"]."'";
	debug($sql);
	$query->sql($sql);


	// Make room for creditnote
	// Re-order orders
	$sql = "SELECT * FROM think_dk.shop_cancelled_orders WHERE id > 22 ORDER BY ID DESC";
	$query->sql($sql);
	$orders = $query->results();

	if($orders) {
		foreach($orders as $order) {

			$sql = "UPDATE think_dk.shop_cancelled_orders SET id = ".($order["id"]+1).", creditnote_no = 'WCRE".($order["id"]+1)."' WHERE id = ".$order["id"];
			debug($sql);
			$query->sql($sql);

		}

	}



	// insert credit note for 491
	$sql = "INSERT INTO think_dk.shop_cancelled_orders SET id = 23, order_id = 491, creditnote_no = 'WCRE23', created_at = '2017-11-29 10:51:00'";
	debug($sql);
	$query->sql($sql);

	// Add order item for 491
	$sql = "INSERT INTO think_dk.shop_order_items SET id = 493, order_id = 491, item_id = 206, name = 'Changer Light', quantity = 1, unit_price = 59, unit_vat = 14.75, total_price = 59, total_vat = 14.75";
	debug($sql);
	$query->sql($sql);

}



// Re-order orders
$sql = "SELECT * FROM think_dk.shop_orders";
$query->sql($sql);
$orders = $query->results();

$order_count = 1;
if($orders) {
	foreach($orders as $order) {

		if($order["id"] == $order_count) {
			debug(["GOOD:" . $order["id"]]);
		}
		else {
			debug(["BAD:" . $order["id"] . " SHOULD HAVE BEEN " . $order_count]);
			
			$sql = "UPDATE think_dk.shop_orders SET id = $order_count, order_no = 'WEB$order_count' WHERE id = ".$order["id"];
			debug($sql);
			$query->sql($sql);

		}

		$order_count++;

	}

}


// Check that all orders has items
$sql = "SELECT * FROM think_dk.shop_orders";
$query->sql($sql);
$orders = $query->results();

if($orders) {
	foreach($orders as $order) {

		$sql = "SELECT * FROM think_dk.shop_order_items WHERE order_id = ".$order["id"];

		if(!$query->sql($sql)) {
			debug($sql);
			debug(["MISSING ITEM"]);
		}

	}
}


// Check order_items integrity
$sql = "SELECT * FROM think_dk.shop_order_items";
$query->sql($sql);
$order_items = $query->results();

$order_item_count = 1;
if($orders) {
	foreach($order_items as $order_item) {

		if(!$order_item["order_id"]) {
			debug(["VERY BAD:" . $order_item["id"]]);
		}

		if($order_item["id"] == $order_item_count) {
			debug(["GOOD:" . $order_item["id"]]);
		}
		else {
			debug(["BAD:" . $order_item["id"] . " SHOULD HAVE BEEN " . $order_item_count]);
			
			$sql = "UPDATE think_dk.shop_order_items SET id = $order_item_count WHERE id = ".$order_item["id"];
			debug($sql);
			$query->sql($sql);

		}

		$order_item_count++;

	}

}


// PROBABLY: remove expires as and renewed_at (if payment method is not set)
// delete related order and update order to previous order

// Update order number to match new order order

// TODO:
// When renewing – if membership does not expire, should we then ignore the expire date? What edge cases exists?

// Find all orders with "Curious Cat (15/11/2018 - 15/12/2018)" comment – and update (are there other comments like this?)



?>

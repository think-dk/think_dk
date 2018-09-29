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



// PREPROCESSING

// CREATE BASE ANONYMOUS USER FOR CLEANUP PROCESS

// DELETE OLD GATEWAY KEY FOR BASE ANON USER
$sql = "DELETE FROM think_dk.user_gateway_stripe WHERE user_id = 142";
$query->sql($sql);


// MOVE ORDERS FROM OTHER TEST ACCOUNTS INTO BASE ANON USER 
// AND DELETE TEST ACCOUNT
$test_account_ids = [256, 565, 566, 571, 572, 573, 584, 591, 594];

foreach($test_account_ids as $test_account_id) {
	
	$sql = "SELECT * FROM think_dk.users WHERE id = $test_account_id";
	$query->sql($sql);
	$user = $query->results();

	if($user) {

		// print_r($user);

		$sql = "SELECT * FROM think_dk.shop_orders WHERE user_id = $test_account_id";
		$query->sql($sql);
		$orders = $query->results();
		if($orders) {
			foreach($orders as $order) {

				$sql = "UPDATE think_dk.shop_orders SET user_id = 142 WHERE id = ".$order["id"];
				$query->sql($sql);

			}

		}

		$response = $UC->delete(["delete", $test_account_id]);
		print_r(message()->getMessages());
		message()->resetMessages();
	}

}


// FIX BROKEN ORDER TIMELINE

// DAN
if($query->sql("SELECT * FROM think_dk.shop_orders WHERE status = 2 AND id = 241")) {
	
	print "SHIFTING DAN";


	// SWITCH STATUS' FOR 241 and 242
	$sql = "UPDATE think_dk.shop_orders SET status = 3, payment_status = 0, shipping_status = 0 WHERE id = 241";
	$query->sql($sql);
	$sql = "UPDATE think_dk.shop_orders SET status = 2, payment_status = 2, shipping_status = 2 WHERE id = 242";
	$query->sql($sql);

	// SHIFT ORDER ITEMS AROUND
	// TO TEMP ORDER ID 2411 (to make room for new 241)
	$sql = "UPDATE think_dk.shop_order_items SET id = 2411, order_id = 242 WHERE id = 241";
	$query->sql($sql);

	// TO 241
	$sql = "UPDATE think_dk.shop_order_items SET id = 241, order_id = 241 WHERE id = 242";
	$query->sql($sql);

	// FROM TEMP ORDER ID TO 242
	$sql = "UPDATE think_dk.shop_order_items SET id = 242, order_id = 242 WHERE id = 2411";
	$query->sql($sql);

	// UPDATE COMMENT
	$sql = "UPDATE think_dk.shop_orders SET comment = 'Changer Light (Signup)' WHERE id = 240";
	$query->sql($sql);

	// UPDATE COMMENT
	$sql = "UPDATE think_dk.shop_orders SET comment = 'Changer Light (Signup)' WHERE id = 241";
	$query->sql($sql);

	// UPDATE NAMES
	$sql = "UPDATE think_dk.shop_order_items SET name = 'Changer (Upgrade)' WHERE id = 568";
	$query->sql($sql);
}


// PETER
if($query->sql("SELECT * FROM think_dk.shop_payments WHERE order_id = 314 AND id = 48")) {

	print "SHIFTING PETER";

	// SHIFT ORDER ITEMS AROUND
	// TO TEMP ORDER ID
	$sql = "UPDATE think_dk.shop_order_items SET id = 3161 WHERE id = 316";
	$query->sql($sql);
	$sql = "UPDATE think_dk.shop_order_items SET id = 3341 WHERE id = 334";
	$query->sql($sql);


	// 445 -> 314
	$sql = "UPDATE think_dk.shop_order_items SET id = 316, order_id = 314 WHERE id = 447";
	$query->sql($sql);
	$sql = "UPDATE think_dk.shop_payments SET order_id = 314 WHERE id = 117";
	$query->sql($sql);


	// 464 -> 332
	$sql = "UPDATE think_dk.shop_order_items SET id = 334, order_id = 332 WHERE id = 466";
	$query->sql($sql);
	$sql = "UPDATE think_dk.shop_payments SET order_id = 332 WHERE id = 128";
	$query->sql($sql);


	// 473 -> 445
	$sql = "UPDATE think_dk.shop_order_items SET id = 447, order_id = 445 WHERE id = 475";
	$query->sql($sql);
	$sql = "UPDATE think_dk.shop_payments SET order_id = 445 WHERE id = 132";
	$query->sql($sql);


	// 480 -> 464
	$sql = "UPDATE think_dk.shop_order_items SET id = 466, order_id = 464 WHERE id = 482";
	$query->sql($sql);
	$sql = "UPDATE think_dk.shop_payments SET order_id = 464 WHERE id = 142";
	$query->sql($sql);


	// 485 -> 473
	$sql = "UPDATE think_dk.shop_order_items SET id = 475, order_id = 473 WHERE id = 487";
	$query->sql($sql);
	$sql = "UPDATE think_dk.shop_payments SET order_id = 473 WHERE id = 147";
	$query->sql($sql);


	// 490 -> 480
	$sql = "UPDATE think_dk.shop_order_items SET id = 482, order_id = 480 WHERE id = 492";
	$query->sql($sql);
	$sql = "UPDATE think_dk.shop_payments SET order_id = 480 WHERE id = 151";
	$query->sql($sql);


	// 314 -> 485
	$sql = "UPDATE think_dk.shop_order_items SET id = 487, order_id = 485 WHERE id = 3161";
	$query->sql($sql);
	$sql = "UPDATE think_dk.shop_payments SET order_id = 485 WHERE id = 48";
	$query->sql($sql);


	// 332 -> 490
	$sql = "UPDATE think_dk.shop_order_items SET id = 492, order_id = 490 WHERE id = 3341";
	$query->sql($sql);
	$sql = "UPDATE think_dk.shop_payments SET order_id = 490 WHERE id = 63";
	$query->sql($sql);


	// UPDATE NAMES
	$sql = "UPDATE think_dk.shop_order_items SET name = 'Changer (Downgrade)' WHERE id = 487";
	$query->sql($sql);

}


// JULIE

if($query->sql("SELECT * FROM think_dk.shop_payments WHERE order_id = 446 AND id = 118")) {

	print "SHIFTING JULIE";

	$sql = "UPDATE think_dk.shop_order_items SET id = 2731 WHERE id = 273";
	$query->sql($sql);
	$sql = "UPDATE think_dk.shop_order_items SET id = 3371 WHERE id = 337";
	$query->sql($sql);


	// 446 -> 271
	$sql = "UPDATE think_dk.shop_order_items SET id = 273, order_id = 271 WHERE id = 448";
	$query->sql($sql);
	$sql = "UPDATE think_dk.shop_payments SET order_id = 271 WHERE id = 118";
	$query->sql($sql);


	// 465 -> 335
	$sql = "UPDATE think_dk.shop_order_items SET id = 337, order_id = 335 WHERE id = 467";
	$query->sql($sql);
	$sql = "UPDATE think_dk.shop_payments SET order_id = 335 WHERE id = 129";
	$query->sql($sql);

	// 474 -> 446
	$sql = "UPDATE think_dk.shop_order_items SET id = 448, order_id = 446 WHERE id = 476";
	$query->sql($sql);
	$sql = "UPDATE think_dk.shop_payments SET order_id = 446 WHERE id = 131";
	$query->sql($sql);

	// 481 -> 465
	$sql = "UPDATE think_dk.shop_order_items SET id = 467, order_id = 465 WHERE id = 483";
	$query->sql($sql);
	$sql = "UPDATE think_dk.shop_payments SET order_id = 465 WHERE id = 143";
	$query->sql($sql);

	// 486 -> 474
	$sql = "UPDATE think_dk.shop_order_items SET id = 476, order_id = 474 WHERE id = 488";
	$query->sql($sql);
	$sql = "UPDATE think_dk.shop_payments SET order_id = 474 WHERE id = 148";
	$query->sql($sql);

	// 271 -> 481
	$sql = "UPDATE think_dk.shop_order_items SET id = 483, order_id = 481 WHERE id = 2731";
	$query->sql($sql);
	$sql = "UPDATE think_dk.shop_payments SET order_id = 481 WHERE id = 34";
	$query->sql($sql);

	// 335 -> 486
	$sql = "UPDATE think_dk.shop_order_items SET id = 488, order_id = 486 WHERE id = 3371";
	$query->sql($sql);
	$sql = "UPDATE think_dk.shop_payments SET order_id = 486 WHERE id = 60";
	$query->sql($sql);


}


// JONATHAN

if($query->sql("SELECT * FROM think_dk.shop_payments WHERE order_id = 605 AND id = 232")) {

	print "SHIFTING JONATHAN";

	// SWITCH STATUS' FOR 241 and 242
	$sql = "UPDATE think_dk.shop_orders SET status = 0, payment_status = 0, shipping_status = 0 WHERE id = 605";
	$query->sql($sql);
	$sql = "UPDATE think_dk.shop_orders SET status = 2, payment_status = 2, shipping_status = 2 WHERE id = 736";
	$query->sql($sql);



	$sql = "UPDATE think_dk.shop_order_items SET id = 6071 WHERE id = 607";
	$query->sql($sql);


	// 771 -> 605
	$sql = "UPDATE think_dk.shop_order_items SET id = 607, order_id = 605 WHERE id = 773";
	$query->sql($sql);

	// 736 -> 771
	$sql = "UPDATE think_dk.shop_order_items SET id = 773, order_id = 771 WHERE id = 738";
	$query->sql($sql);

	// 605 -> 736
	$sql = "UPDATE think_dk.shop_order_items SET id = 738, order_id = 736 WHERE id = 6071";
	$query->sql($sql);
	$sql = "UPDATE think_dk.shop_payments SET order_id = 736 WHERE id = 232";
	$query->sql($sql);


	// UPDATE COMMENT
	$sql = "UPDATE think_dk.shop_orders SET comment = 'Membership renewed (08/05/2018 - 08/06/2018)' WHERE id = 771";
	$query->sql($sql);

}


// MECHTHILD

if($query->sql("SELECT * FROM think_dk.shop_payments WHERE order_id = 596 AND id = 221")) {

	print "SHIFTING MECHTHILD";

	// SWITCH STATUS' FOR 596 and 729
	$sql = "UPDATE think_dk.shop_orders SET status = 0, payment_status = 0, shipping_status = 0 WHERE id = 596";
	$query->sql($sql);
	$sql = "UPDATE think_dk.shop_orders SET status = 2, payment_status = 2, shipping_status = 2 WHERE id = 772";
	$query->sql($sql);




	$sql = "UPDATE think_dk.shop_order_items SET id = 5981 WHERE id = 598";
	$query->sql($sql);
	$sql = "UPDATE think_dk.shop_order_items SET id = 7311 WHERE id = 731";
	$query->sql($sql);


	// 772 -> 596
	$sql = "UPDATE think_dk.shop_order_items SET id = 598, order_id = 596 WHERE id = 774";
	$query->sql($sql);

	// 773 -> 729
	$sql = "UPDATE think_dk.shop_order_items SET id = 731, order_id = 729 WHERE id = 775";
	$query->sql($sql);

	// 729 -> 773
	$sql = "UPDATE think_dk.shop_order_items SET id = 775, order_id = 773 WHERE id = 7311";
	$query->sql($sql);

	// 596 -> 772
	$sql = "UPDATE think_dk.shop_order_items SET id = 774, order_id = 772 WHERE id = 5981";
	$query->sql($sql);
	$sql = "UPDATE think_dk.shop_payments SET order_id = 772 WHERE id = 221";
	$query->sql($sql);


	// UPDATE COMMENT, price and text
	$sql = "UPDATE think_dk.shop_orders SET comment = 'Membership renewed (15/01/2018 - 15/02/2018)' WHERE id = 596";
	$query->sql($sql);
	$sql = "UPDATE think_dk.shop_order_items SET name = 'Changer Light, automatic renewal (15/01/2018 - 15/02/2018)', item_id = 206, unit_price = 59, unit_vat = 14.75, total_price = 59, total_vat = 14.75 WHERE id = 598";
	$query->sql($sql);


	$sql = "UPDATE think_dk.shop_orders SET comment = 'Membership renewed (15/02/2018 - 15/03/2018)' WHERE id = 729";
	$query->sql($sql);
	$sql = "UPDATE think_dk.shop_order_items SET name = 'Changer Light, automatic renewal (15/02/2018 - 15/03/2018)', item_id = 206, unit_price = 59, unit_vat = 14.75, total_price = 59, total_vat = 14.75 WHERE id = 731";
	$query->sql($sql);

	$sql = "UPDATE think_dk.shop_orders SET comment = 'Changer' WHERE id = 772";
	$query->sql($sql);

	$sql = "UPDATE think_dk.shop_orders SET comment = 'Changer, automatic renewal (21/04/2018 - 21/05/2018)' WHERE id = 773";
	$query->sql($sql);

}




// UPDATE COMMENTS
$sql = "SELECT * FROM ".$SC->db_orders . " as orders, ".$SC->db_order_items." as items WHERE orders.id = items.order_id AND items.item_id != 205 GROUP BY user_id";
//print $sql;
$query->sql($sql);


$first_orders = $query->results();

print '<ul>';
//print_r($first_orders);
foreach($first_orders as $first_order) {

	print '<li>';

	print '<div>' . $first_order["billing_name"] . ", " . $first_order["order_id"] . ", " . $first_order["name"] . ", " . $first_order["comment"] . ", " . $first_order["user_id"] . '</div>';

	// SET CORRECT ORDER COMMENT
	if(preg_match("/Upgrade/", $first_order["name"])) {

		$sql = "UPDATE think_dk.shop_orders SET comment = '".$first_order["name"]."' WHERE id = ".$first_order["order_id"];
		$query->sql($sql);
	}
	else {

		$sql = "UPDATE think_dk.shop_orders SET comment = '".$first_order["name"]." (Signup)' WHERE id = ".$first_order["order_id"];
		$query->sql($sql);
	}


	print '<ul>';

	$sql = "SELECT * FROM ".$SC->db_orders . " as orders, ".$SC->db_order_items." as items WHERE orders.id = items.order_id AND orders.user_id = ".$first_order["user_id"]." AND orders.id != ".$first_order["order_id"];
	// print $sql;
	$query->sql($sql);
	$additional_orders = $query->results();
	foreach($additional_orders as $additional_order) {
		// Only look at newer orders
		if($additional_order["order_id"] > $first_order["order_id"]) {

			print '<li>';

			print '<div>' . $additional_order["billing_name"] . ", " . $additional_order["order_id"] . ", " . $additional_order["name"] . ", " . $additional_order["comment"] . ", " . $additional_order["status"] . '</div>';

			if($additional_order["name"] == "Curious Cat") {

				$sql = "UPDATE think_dk.shop_orders SET comment = '".$additional_order["name"]." (Downgrade)' WHERE id = ".$additional_order["order_id"];
				$query->sql($sql);
			}

			print '</li>';

		}

	}

	print '</ul>';


	print '</li>';

}

print '</ul>';


// UPDATE REMAINING COMMENTS
$sql = "SELECT * FROM ".$SC->db_orders . " as orders, ".$SC->db_order_items." as items WHERE orders.id = items.order_id AND orders.comment = 'Curious Cat (28/09/2018 - 28/10/2018)'";
print $sql;
$query->sql($sql);


$bad_order_comments = $query->results();

print '<ul>';
//print_r($first_orders);
foreach($bad_order_comments as $bad_order_comment) {

	print '<li>';

	print '<div>' . $bad_order_comment["billing_name"] . ", " . $bad_order_comment["order_id"] . ", " . $bad_order_comment["name"] . ", " . $bad_order_comment["comment"] . ", " . $bad_order_comment["user_id"] . '</div>';

	if($bad_order_comment["name"] == "Curious Cat") {
		$sql = "UPDATE think_dk.shop_orders SET comment = 'Curious Cat (Signup)' WHERE id = ".$bad_order_comment["order_id"];
		$query->sql($sql);
		
	}
	else {
		$sql = "UPDATE think_dk.shop_orders SET comment = '".ucfirst($bad_order_comment["name"])."' WHERE id = ".$bad_order_comment["order_id"];
		$query->sql($sql);
	}

	print '</li>';

}

print '</ul>';

?>

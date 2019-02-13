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

$query = new Query();


// Find all user_item_subscriptions with item_id=205 and expires_at set
$sql = "SELECT * FROM think_dk.shop_order_items WHERE unit_vat != 0";
$query->sql($sql);
// debug([$subscriptions]);
$order_items = $query->results();
if($order_items) {
	
	foreach($order_items as $order_item) {

		// debug([$order_item]);

		if($order_item["unit_price"] * 0.2 != $order_item["unit_vat"]) {

			$sql = "UPDATE think_dk.shop_order_items SET unit_vat = ".($order_item["unit_price"]*0.2).", total_vat = ".($order_item["total_price"]*0.2)." WHERE id = ".$order_item["id"];
			$query->sql($sql);
			debug([$order_item, "Bad VAT", $sql]);
		}
		else {
			
			// debug([$order_item, "Good VAT"]);
			
		}
	
	}

}


?>

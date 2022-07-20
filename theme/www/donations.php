<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$model = new Shop();


$page->bodyClass("donations");
$page->pageTitle("Donations");


if($action) {

	# /donations/addToCart
	if($action[0] == "addToCart" && security()->validateCsrfToken()) {

		// add membership to new or existing cart
		$cart = $model->addToCart(array("addToCart"));


		// successful creation
		if($cart) {

			header("Location: /shop/checkout");
			exit();
		}
		// something went wrong
		else {
			message()->addMessage("Colonizing Mars! Waw. The computer is so excited it cannot process your request right now. Try again later.", array("type" => "error"));
		}

	}

}

// plain signup directly
// /signup
$page->page(array(
	"templates" => "donations/index.php"
));
?>
